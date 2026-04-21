import React from 'react';
import StyledText from "./StyledText";
import {StyleSheet, View} from "react-native";
import {COLORS} from "../constants/colors";

const MessageItem = ({message, isUser}) => {
    return (
        <View style={[
            styles.container,
            isUser ? {alignItems: "flex-end"} : {alignItems: "flex-start"}
        ]} >
            <StyledText variant={"message"}>{message}</StyledText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.PRIMARY_BACKGROUND,
        marginVertical: 7,
        marginHorizontal: 5
    }
})

export default MessageItem;