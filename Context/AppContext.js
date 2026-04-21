import {createContext, useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";
import PubNub from "pubnub";
import {c} from "react/compiler-runtime";
import userName from "../app/chat/[channelName]";
import {addLog} from "react-native/Libraries/LogBox/Data/LogBoxData";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [session, setSessionState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userParams, setUserParams] = useState({
        userName: "",
        privateKey: "",
        publicKey: ""
    })
    // Pubnub
    const [pubnub, setPubnub] = useState(null);
    const [messages, setMessages] = useState([]);
    const [channels, setChannels] = useState([]);
    const [users, setUsers] = useState([]);

    const subscribeToChannel = (channelName) => {
        if (channels.includes(channelName)) {
            return;
        }

        const channel = pubnub.channel(channelName);
        const subscription = channel.subscription({receivePresenceEvents: true});
        subscription.subscribe()

        setChannels(prev => [...prev, channelName]);

        pubnub.publish({
            message: {
                to: channelName.split("|")[0],
                channel: channelName
            },
            channel: 'users',
        }).then(
            result => {
                console.log("Publish channel success: ", result);
            },
            error => {
                console.error("Error in publish channel: " + error)
            }
        )
    }

    const loadData = async () => {
        setIsLoading(true);
        try {
            const storedSession = !!(await SecureStore.getItemAsync('session'));

            if (!storedSession) {
                console.log("NOT SIGN");
                return;
            }

            const storedUserName = await SecureStore.getItemAsync('userName');
            const storedPublicKey = await SecureStore.getItemAsync('publicKey')
            const storedPrivateKey = await SecureStore.getItemAsync('privateKey')

            setSessionState(storedSession)
            const userParams = {
                userName: storedUserName,
                publicKey: storedPublicKey,
                privateKey: storedPrivateKey
            }
            setUserParams(userParams);
        } finally {
            setIsLoading(false);
        }
    }

    const loadUsers = async (pubnubInstance) => {
        try {
            let tempUsers = []
            await pubnubInstance.hereNow({channels: ["users"], includeUUIDs: true, includeState: true})
                .then(
                    result => {
                        result["channels"]["users"]["occupants"].forEach((value, index, arr) => {
                            let user = value.uuid.replace("%20", " ");
                            if (user !== userParams.userName) {
                                tempUsers.push(user)
                            }
                        })
                        setUsers(tempUsers);
                    },
                    error => {
                        console.log("error(promise): " + error);
                    }
                )
        } catch (error) {
            console.log("error(catch): " + error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        const initPubNub = async () => {
            if (!userParams.userName) {
                return;
            }

            const pubnubInstance = new PubNub({
                publishKey: "pub-c-8cac1432-1959-4e5a-b028-18b18ae8410c",
                subscribeKey: "sub-c-73fcebab-f9bf-4935-9e87-4784a75bdcce",
                userId: userParams.userName
            });

            pubnubInstance.addListener({
                message: function (event) {
                    console.log("Receive message");
                    if (event.channel === "users" && !channels.includes(event.message.channel)) {
                        const channel = pubnubInstance.channel(event.message.channel);
                        const subscription = channel.subscription({receivePresenceEvents: true});
                        subscription.subscribe()

                        setChannels(prev => [...prev, event.message.channel]);

                        return;
                    }

                    setMessages(prev => [...prev, {
                        message: event.message,
                        channel: event.channel,
                        timetoken: event.timetoken,
                        from: event.publisher.replace("%20", " ")
                    }]);
                },
                status: function (event) {
                    console.log("Status: " + event.category);
                    if (event.category === "PNConnectedCategory") {
                        loadUsers(pubnubInstance);
                    }
                },
                presence: function (event) {
                    console.log("Presence: " + event)
                    loadUsers(pubnubInstance)
                }
            })

            const channel = pubnubInstance.channel('users');
            const subscription = channel.subscription({receivePresenceEvents: true});
            subscription.subscribe()

            setPubnub(pubnubInstance);
        }

        initPubNub()
    }, [userParams.userName])

    const clearSession = async () => {
        await SecureStore.deleteItemAsync("session");
        await SecureStore.deleteItemAsync("userName");
        await SecureStore.deleteItemAsync("publicKey");
        await SecureStore.deleteItemAsync("privateKey");
    }

    const saveToStorage = async (key, value) => {
        switch (key) {
            case "session":
                setSessionState(value);
                await SecureStore.setItemAsync("session", value ? "session" : "");
                if (!value) {
                    pubnub?.unsubscribeAll();
                    await clearSession()
                }
                break;
            case "userName":
                setUserParams(prevState => {
                    prevState.userName = value;
                    return prevState
                })
                await SecureStore.setItemAsync("userName", value);
                break;
            case "publicKey":
                setUserParams(prevState => {
                    prevState.publicKey = value;
                    return prevState;
                })
                await SecureStore.setItemAsync("publicKey", value);
                break;
            case "privateKey":
                setUserParams(prevState => {
                    prevState.privateKey = value;
                    return prevState;
                })
                await SecureStore.setItemAsync("privateKey", value);
                break;
            default:
                Alert.alert("Ошибка!", "Такого ключа не существует: " + key)
        }
    }

    return (
        <AppContext.Provider value={{
            session,
            isLoading,
            userParams,
            saveToStorage,
            messages,
            channels,
            subscribeToChannel,
            users,
            pubnub
        }}>
            {props.children}
        </AppContext.Provider>
    )
}