import { View, StyleSheet } from "react-native";
import StyledText from "../components/StyledText"
import StyledButton from "../components/StyledButton"
import { COLORS } from "../constants/colors";
import { router } from "expo-router";

export default function Index() {
    return (
        <View style={styles.container} >
            <View style={styles.title} >
                <StyledText variant={"title"}>
                    {"Добро\nпожаловать\nв "}
                    <StyledText bold>Krypton</StyledText>
                </StyledText>
                <StyledText variant={"subTitle"}>
                    <StyledText bold>Первый</StyledText>
                    {" в мире\nработающий\n"}
                    <StyledText bold>peer-to-peer</StyledText>
                    {"\nмессенджер"}
                </StyledText>
                <StyledText variant={"subTitle"}>
                    {"Жмите на "}
                    <StyledText bold>"Войти"</StyledText>
                    {" или\n"}
                    <StyledText bold>"Регистрация"</StyledText>
                    {" ниже и\nобщайтесь без\n"}
                    <StyledText bold>ограничений</StyledText>
                </StyledText>
            </View>

            <View style={styles.buttons} >
                <StyledButton variant="primary" onPress={() => {}}>
                    <StyledText variant="button" bold >Войти</StyledText>
                </StyledButton>
                <StyledButton variant="secondary" onPress={() => {
                    router.replace("/register")
                }}>
                    <StyledText variant="button" bold >Регистрация</StyledText>
                </StyledButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.PRIMARY_BACKGROUND
    },
    title: {
        marginTop: 150
    },
    buttons: {
        marginBottom: 45
    }
})