import { COLORS } from "../constants/colors"
import { StyleSheet, Text, TextProps } from "react-native"

const StyledText = ({variant, bold, ...props}) => {
    return <Text style={[
        variant === "title" ? styles.title : null,
        variant === "subTitle" ? styles.subTitle : null,
        variant === "button" ? styles.button : null,
        variant === "smallButton" ? styles.smallButton : null,
        variant === "body" ? styles.smallButton : null,
        variant === "message" ? styles.message : null,
        bold === true ? styles.bold : null
    ]} {...props} />
}

const styles = StyleSheet.create({
    title: {
        fontSize: 48,
        fontFamily: "Inter",
        color: COLORS.PRIMARY_TEXT,
        lineHeight: 58,
        fontWeight: "regular",
        paddingBottom: 10
    },
    subTitle: {
        fontSize: 24,
        fontFamily: "Inter",
        color: COLORS.PRIMARY_TEXT,
        lineHeight: 29,
        fontWeight: "regular",
        paddingVertical: 10,
    },
    bold: {
        fontWeight: "600"
    },
    button: {
        fontSize: 20,
        fontFamily: "Inter",
        color: COLORS.PRIMARY_TEXT,
        lineHeight: 29,
        fontWeight: "regular",
        paddingVertical: 10,
    },
    smallButton: {
        fontSize: 16,
        fontFamily: "Inter",
        color: COLORS.PRIMARY_TEXT,
        lineHeight: 29,
        fontWeight: "bold",
        paddingVertical: 10,
    },
    message: {
        fontWeight: "600",
        backgroundColor: COLORS.SECONDARY_BUTTON,
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontSize: 18,
        color: COLORS.PRIMARY_TEXT,
        borderRadius: 5
    }
})

export default StyledText