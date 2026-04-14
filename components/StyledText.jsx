import { COLORS } from "../constants/colors"
import { StyleSheet, Text, TextProps } from "react-native"

const StyledText = ({variant, bold, ...props}) => {
    return <Text style={[
        variant === "title" ? styles.title : null,
        variant === "subTitle" ? styles.subTitle : null,
        variant === "button" ? styles.button : null,
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
    }
})

export default StyledText