import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import PubNub from "pubnub";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [session, setSessionState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [userName, setUserName] = useState("");
    // Pubnub
    const [pubnub, setPubnub] = useState(null);
    const [messages, setMessages] = useState([]);

    const loadSession = async () => {
        try {
            const storedSession = !!(await SecureStore.getItemAsync('session'));
            setSessionState(storedSession)
        } finally {
            setIsLoading(false);
        }
    }

    const loadData = async () => {
        setIsLoading(true);
        try {
            const storedUserName = await SecureStore.getItemAsync('userName');
            const storedPublicKey = await SecureStore.getItemAsync('publicKey')
            const storedPrivateKey = await SecureStore.getItemAsync('privateKey')

            setUserName(storedUserName);
            setPrivateKey(storedPrivateKey);
            setPublicKey(storedPublicKey);
        } finally {
            setIsLoading(false);
        }
    }

    // Загружаем данные при монтировании компоненты
    useEffect(() => {
        loadSession()
        loadData()
    }, [])

    useEffect(() => {
        const initPubNub = async () => {
            if(!userName) {
                console.warn("userName not found")
                return;
            }

            const pubnubInstance = new PubNub({
                publishKey: "pub-c-2d931cf0-b8d6-4aeb-8a06-cd87945abc69",
                subscribeKey: "sub-c-e6e8b19a-bafc-47bc-aab4-e818aaea8fc0",
                userId: userName
            });

            pubnubInstance.addListener({
                message: function (event) {
                    setMessages(prev => [...prev, {
                        message: event.message,
                        channel: event.channel,
                        timetoken: event.timetoken,
                    }]);
                },
                status: function (event) {
                    console.log("Status: " + event.category);
                }
            })

            const channel = pubnubInstance.channel('users');
            const subscription = channel.subscription({ receivePresenceEvents: true });
            subscription.subscribe()

            setPubnub(pubnubInstance);
        }
        
        initPubNub()
    }, [userName])

    const setSession = async (value) => {
        if (value) {
            setSessionState(true);
            await SecureStore.setItemAsync("session", "x3");
        } else {
            setSessionState(false);
            await SecureStore.deleteItemAsync("session");
            await SecureStore.deleteItemAsync("userName");
            await SecureStore.deleteItemAsync("publicKey");
            await SecureStore.deleteItemAsync("privateKey");
        }
    }

    const saveToStorage = async (key, value) => {
        switch (key) {
            case "session":
                await setSession(value);
                break;
            case "userName":
                setUserName(value);
                await SecureStore.setItemAsync("userName", value);
                break;
            case "publicKey":
                setPublicKey(value);
                await SecureStore.setItemAsync("publicKey", value);
                break;
            case "privateKey":
                setPrivateKey(value);
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
            publicKey,
            privateKey,
            userName,
            saveToStorage,
            pubnub,
            messages
        }} >
            {props.children}
        </AppContext.Provider>
    )
}