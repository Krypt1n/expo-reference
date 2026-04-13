import { useContext } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { AppContext } from "../Context/AppContext";
import { router } from "expo-router";

export default function Index() {
    const { language, setLanguage, setSession } = useContext(AppContext);

    return (
        <View style={styles.container} >
            <Text style={styles.text} >{
                language === "EN" ? "Welcome Page" : "Стартовая страница"
            }</Text>
            <Button title="Change language" onPress={() => {
                if (language === "EN") {
                    setLanguage("RU")
                } else {
                    setLanguage("EN")
                }
            }} />
            <Button title={
                language === "EN" ? "Sign in" : "Войти"
            } onPress={() => {
                setSession("session")
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