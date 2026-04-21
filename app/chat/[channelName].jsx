import {View, StyleSheet, Text, FlatList, Alert, Keyboard, TouchableWithoutFeedback} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import StyledButton from "../../components/StyledButton";
import StyledText from "../../components/StyledText";
import {COLORS} from "../../constants/colors";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../Context/AppContext";
import StyledTextInput from "../../components/StyledTextInput";
import MessageItem from "../../components/MessageItem";

const channelName = () => {
    const {channelName} = useLocalSearchParams();
    const {messages, userParams, subscribeToChannel, pubnub, channels} = useContext(AppContext)
    const showChannelName = channelName.split("|")[0] === userParams.userName ? channelName.split("|")[1] : channelName.split("|")[0];
    const [message, setMessage] = useState("");

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        if (channelName !== undefined && !channels.includes(channelName)) {
            console.log("Subscribe to channel: " + channelName);
            subscribeToChannel(channelName);
        }

        const showSubscription = Keyboard.addListener('keyboardWillShow', (event) => {
            setKeyboardVisible(true)
        });
        const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardVisible(false)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleSendPress = async () => {
        if (message === "") {
            return;
        }

        try {
            const response = await pubnub.publish({
                message: message,
                channel: channelName,
            });
            console.log('Publish Success:', response);
        } catch (error) {
            console.error("Error in publish: " + error)
        }

        setMessage("")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container, {paddingBottom: keyboardVisible ? 330 : 0}]}>
                <View style={styles.header}>
                    <StyledButton variant={"back"} onPress={() => {
                        router.replace("/")
                    }}>
                        <StyledText variant={"smallButton"}>Back</StyledText>
                    </StyledButton>
                    <StyledText variant={"subTitle"}>{showChannelName}</StyledText>
                </View>
                <View style={styles.main}>
                    <FlatList data={messages.filter((message) => message.channel === channelName)}
                              renderItem={({item}) => (
                                  <MessageItem message={item.message} isUser={item.from === userParams.userName}/>
                              )}/>
                </View>
                <View style={styles.controlPanel}>
                    <StyledTextInput placeholder="Поиск..." onChangeText={setMessage} value={message}/>
                    <StyledButton variant={"send"} onPress={handleSendPress}>
                        <StyledText variant={"body"}>></StyledText>
                    </StyledButton>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.PRIMARY_BACKGROUND
    },
    header: {
        flex: 1,
        width: "100%",
        backgroundColor: COLORS.SECONDARY_BUTTON,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 30,
        paddingHorizontal: 10
    },
    main: {
        flex: 10,
        width: "100%",
    },
    controlPanel: {
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    }
})

export default channelName;