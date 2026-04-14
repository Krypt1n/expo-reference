import { COLORS } from "../constants/colors";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

const StyledTextInput = ({...props}) => {
    return (
        <TextInput keyboardAppearance="dark" style={styles.base} placeholderTextColor={COLORS.SECONDARY_TEXT} {...props} />
    )
}

const styles = StyleSheet.create({
    base: {
        width: 300,
        height: 45,
        backgroundColor: COLORS.SECONDARY_BUTTON,
        borderRadius: 38,
        paddingHorizontal: 25,
        color: COLORS.PRIMARY_TEXT,
        fontFamily: "Inter",
    }
})

export default StyledTextInput;