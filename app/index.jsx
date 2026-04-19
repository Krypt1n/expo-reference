import {useContext, useState} from "react";
import {Text, View, Button, StyleSheet, FlatList, Modal, TouchableWithoutFeedback} from "react-native";
import {AppContext} from "../Context/AppContext";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../constants/colors";
import StyledButton from "../components/StyledButton";
import StyledText from "../components/StyledText";
import SearchUsersModal from "../components/SearchUsersModal";

export default function Index() {
    const {messages, users} = useContext(AppContext);
    const [visible, setVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/*<FlatList data={messages} renderItem={({item}) => (*/}
            {/*    <View style={styles.item}>*/}
            {/*        <Text style={styles.text} >Channel: {item.channel}</Text>*/}
            {/*        <Text style={styles.text} >Message: {item.message}</Text>*/}
            {/*        <Text style={styles.text} >Timetoken: {item.timetoken}</Text>*/}
            {/*    </View>*/}
            {/*)}/>*/}

            <SearchUsersModal users={users} visible={visible} setVisible={setVisible}/>

            <StyledButton variant="secondary" onPress={() => {
                setVisible(prev => !prev);
            }}>
                <StyledText variant="button">Поиск</StyledText>
            </StyledButton>
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