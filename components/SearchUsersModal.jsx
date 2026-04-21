import {Modal, View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {COLORS} from "../constants/colors";
import StyledTextInput from "./StyledTextInput";
import ListOfUsers from "./ListOfUsers";
import {useContext, useEffect, useState} from "react";

const SearchUsersModal = ({visible, setVisible, users}) => {
    const [localUsers, setLocalUsers] = useState([]);

    useEffect(() => {
        setLocalUsers(users)
    }, [users]);

    const onUserSearch = (text) => {
        if(text === "" || users === undefined) {
            return;
        }

        let result = []
        users.forEach((user, index, array) => {
            if(user.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())) {
                result.push(user)
            }
        })
        setLocalUsers(result)
    }

    return (
        <Modal
            visible={visible}
            animationType={"slide"}
            transparent={true}
            onRequestClose={() => setVisible(false)}>
            <TouchableWithoutFeedback onPress={() => {setVisible(false)}}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <StyledTextInput placeholder="Поиск..." onChangeText={onUserSearch} variant={"dark"}/>
                        <ListOfUsers users={localUsers}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: "center",
        justifyContent: "center"
    },
    modalContent: {
        backgroundColor: COLORS.SECONDARY_BUTTON,
        borderRadius: 38,
        padding: 20,
        alignItems: "center",
        width: 350,
        height: 400
    }
})

export default SearchUsersModal;