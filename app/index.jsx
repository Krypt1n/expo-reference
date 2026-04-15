import { useContext } from "react";
import {Text, View, Button, StyleSheet, FlatList} from "react-native";
import { AppContext } from "../Context/AppContext";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../constants/colors";
import {router} from "expo-router";

export default function Index() {
    const { messages, saveToStorage } = useContext(AppContext);

    return (
        <SafeAreaView style={styles.container} >
            <FlatList data={messages} renderItem={({item}) => (
                <View style={styles.item}>
                    <Text style={styles.text} >Channel: {item.channel}</Text>
                    <Text style={styles.text} >Message: {item.message}</Text>
                    <Text style={styles.text} >Timetoken: {item.timetoken}</Text>
                </View>
            )}/>
            <Button title={"Sing out"} onPress={() => {
                saveToStorage("session", null);
                router.replace("/")
            }} />
        </SafeAreaView>
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
        fontSize: 14,
        color: "#fff",
        fontFamily: "Inter",
        margin: 5
    },
    item: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: COLORS.SECONDARY_BUTTON,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
    }
})