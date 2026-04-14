import { useContext } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { AppContext } from "../Context/AppContext";
import { router } from "expo-router";
import StyledText from "../components/StyledText";

export default function Index() {
    const { saveToStorage, userName, publicKey, privateKey } = useContext(AppContext);

    console.log(userName);
    

    return (
        <View style={styles.container} >
            <Text style={styles.text} >Привет, {userName}</Text>
            <StyledText variant={"subTitle"}>Public key: {publicKey}</StyledText>
            <StyledText variant={"subTitle"}>Private key: {privateKey}</StyledText>
            <Button title={"Выйти"} onPress={() => {
                saveToStorage("session", null)
                router.replace("/")
            }} />
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
    text: {
        fontSize: 32,
        color: "#fff",
        fontFamily: "Inter"
    }
})