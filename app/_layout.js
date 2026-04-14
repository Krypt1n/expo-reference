import React, { useContext } from "react";
import { Stack } from "expo-router";
import { AppContext, AppContextProvider } from "../Context/AppContext";
import SplashScreen from "../components/SplashScreen";
import "react-native-get-random-values"

export default function Root() {
    return (
        <AppContextProvider>
            <RootNavigator />
        </AppContextProvider>
    )
}

const RootNavigator = () => {
    const {session, isLoading} = useContext(AppContext);

    // Статус загрузки
    if(isLoading) {
        return <SplashScreen />
    }

    return (
        <Stack screenOptions={{headerShown: false}} >
            {/* Основная страница */}
            <Stack.Protected guard={session} >
                <Stack.Screen name="index" />
            </Stack.Protected>

            {/* Стартовая страница */}
            <Stack.Protected guard={!session} >
                <Stack.Screen name="welcome" />
            </Stack.Protected>
        </Stack>
    )
}