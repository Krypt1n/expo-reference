import { COLORS } from "../constants/colors";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

const StyledTextInput = ({variant, ...props}) => {
    return (
        <TextInput keyboardAppearance="dark" style={[
            styles.base,
            variant === "dark" ? {backgroundColor: COLORS.PRIMARY_BACKGROUND} : {backgroundColor: COLORS.SECONDARY_BUTTON}
        ]} placeholderTextColor={COLORS.SECONDARY_TEXT} {...props} />
    )
}

const styles = StyleSheet.create({
    base: {
        width: 300,
        height: 45,
        borderRadius: 38,
        paddingHorizontal: 25,
        color: COLORS.PRIMARY_TEXT,
        fontFamily: "Inter",
    }
})

export default StyledTextInput;