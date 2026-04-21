import React, {useContext} from 'react';
import StyledText from "./StyledText";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {COLORS} from "../constants/colors";
import {router} from "expo-router";
import {AppContext} from "../Context/AppContext";

const ChannelItem = ({channelName}) => {
    const {userParams} = useContext(AppContext);
    const showChannelName = (channelName) => {
        return channelName.split("|")[0] === userParams.userName ? channelName.split("|")[1] : channelName.split("|")[0];
    }
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            router.replace(`/chat/${channelName}`);
        }} >
            <StyledText variant={"subTitle"} bold>{showChannelName(channelName)}</StyledText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: COLORS.SECONDARY_BUTTON,
        marginHorizontal: 10,
        marginVertical: 10,
        height: 60,
        borderRadius: 19,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    }
})

export default ChannelItem;