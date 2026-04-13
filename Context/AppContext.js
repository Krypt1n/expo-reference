import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    // Состояние для смены языка интерфейса
    const [language, setLanguage] = useState("EN");

    // Состояние входа пользователя в Krypton
    const [session, setSessionState] = useState(false);

    // Состояние для работы SplashScreen в моментах подгрузки данных
    const [isLoading, setIsLoading] = useState(true);

    // Функция загрузки сессии из памяти
    const loadSession = async () => {
        try {
            const storedSession = await SecureStore.getItemAsync('session') ? true : false;
            setSessionState(storedSession)
        } finally {
            setIsLoading(false);
        }
    }

    // Загружаем данные при монтировании компоненты
    useEffect(() => {
        loadSession()

        return () => {}
    }, [])

    // Функция для установки состояния входа
    const setSession = async (value) => {
        if (value) {
            setSessionState(true);
            await SecureStore.setItemAsync("session", value);
        } else {
            setSessionState(false);
            await SecureStore.deleteItemAsync("session");
        }
    }

    return (
        <AppContext.Provider value={{
            language,
            setLanguage,
            session,
            setSession,
            isLoading
        }} >
            {props.children}
        </AppContext.Provider>
    )
}