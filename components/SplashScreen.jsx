import { Text, View } from "react-native"

// Компонента, отрисовывающаяся при загрузки каких-либо данных
const SplashScreen = () => {
    return <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }} >
        <Text>Loading...</Text>
    </View>
}

export default SplashScreen;