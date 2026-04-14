import { COLORS } from "../constants/colors"
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native"

const StyledButton = ({variant, children, ...props}) => {
    return <TouchableOpacity style={[
        styles.button,
        variant === "primary" ? styles.primary : null,
        variant === "secondary" ? styles.secondary : null,
    ]} {...props}>
        {children}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 38,
        marginVertical: 8
    },
    primary: {
        backgroundColor: COLORS.PRIMARY_BUTTON,
    },
    secondary: {
        backgroundColor: COLORS.SECONDARY_BUTTON,
    }
})

export default StyledButton