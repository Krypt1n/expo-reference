import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {COLORS} from "../constants/colors";
import StyledButton from "./StyledButton";
import StyledText from "./StyledText";
import {router} from "expo-router";

const UserSearchCard = (props) => {
    return (
        <View style={styles.item}>
            <StyledText variant={"body"} bold >{props.userName}</StyledText>
            <StyledButton onPress={() => {
                router.replace(`/chat/${props.userName}`)
            }} variant={"userCard"}>
                <StyledText variant={"smallButton"} >Чат</StyledText>
            </StyledButton>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        width: 300,
        height: 60,
        marginTop: 20,
        backgroundColor: COLORS.PRIMARY_BACKGROUND,
        borderRadius: 38,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter",
        color: COLORS.PRIMARY_TEXT
    },
    button: {
        marginRight: 10,
    }
})

export default UserSearchCard;