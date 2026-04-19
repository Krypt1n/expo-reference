import {View, StyleSheet, Text} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import StyledButton from "../../components/StyledButton";
import StyledText from "../../components/StyledText";

const UserName = () => {
    const {userName} = useLocalSearchParams();
    return (
        <View style={styles.container} >
            <Text>{userName}</Text>
            <StyledButton variant={"userCard"} onPress={() => {
                router.replace("/");
            }} >
                <StyledText variant={"smallButton"} >Back</StyledText>
            </StyledButton>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default UserName;