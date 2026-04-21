import React, {useContext, useState} from "react";
import {Button, FlatList, StyleSheet, View} from "react-native";
import {AppContext} from "../Context/AppContext";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../constants/colors";
import StyledButton from "../components/StyledButton";
import StyledText from "../components/StyledText";
import SearchUsersModal from "../components/SearchUsersModal";
import {router} from "expo-router";
import ChannelList from "../components/ChannelList";
import ChannelItem from "../components/ChannelItem";

export default function Index() {
    const {users, saveToStorage, channels} = useContext(AppContext);
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>

            <View style={styles.header} >
                <StyledText variant={"subTitle"} >Chats</StyledText>
            </View>

            <View style={styles.channelList} >
                <FlatList data={channels} renderItem={({item}) => (
                    <ChannelItem channelName={item} />
                )}/>
            </View>

            <View style={styles.controlPanel} >
                <SearchUsersModal users={users} visible={visible} setVisible={setVisible}/>

                <StyledButton variant="secondary" onPress={() => {
                    setVisible(prev => !prev);
                }}>
                    <StyledText variant="button">Поиск</StyledText>
                </StyledButton>
                <Button title={"Выйти"} onPress={() => {
                    saveToStorage("session", false);
                    router.replace("/");
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222222",
    },
    header: {
        height: 100,
        width: "100%",
        backgroundColor: COLORS.SECONDARY_BUTTON,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 30,
        paddingHorizontal: 10
    },
    channelList: {
        flex: 7,
        width: "100%",
        marginTop: 10,
    },
    controlPanel: {
        flex: 1,
        marginBottom: 30
    }
})