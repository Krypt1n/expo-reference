import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    // Состояние для смены языка интерфейса
    // const [language, setLanguage] = useState("EN");

    // Состояние входа пользователя в Krypton
    const [session, setSessionState] = useState(false);

    // Состояние для работы SplashScreen в моментах подгрузки данных
    const [isLoading, setIsLoading] = useState(true);

    // Состояние для хранения public_key
    const [publicKey, setPublicKey] = useState("");

    // Состояние для хранения private_key
    const [privateKey, setPrivateKey] = useState("");

    // Состояние для хранения имени пользователя
    const [userName, setUserName] = useState("");

    // Функция загрузки сессии из памяти
    const loadSession = async () => {
        try {
            const storedSession = await SecureStore.getItemAsync('session') ? true : false;
            setSessionState(storedSession)
        } finally {
            setIsLoading(false);
        }
    }

    const loadUserData = async () => {
        try {
            const storedUserName = await SecureStore.getItemAsync('userName');
            const storedPublicKey = await SecureStore.getItemAsync('publicKey')
            const storedPrivateKey = await SecureStore.getItemAsync('privateKey')

            setUserName(storedUserName);
            setPrivateKey(storedPrivateKey);
            setPublicKey(storedPublicKey);
        } finally {
            setIsLoading(false);
        }
    }

    // Загружаем данные при монтировании компоненты
    useEffect(() => {
        loadSession()
        loadUserData()
    }, [])

    // Функция для установки состояния входа
    const setSession = async (value) => {
        if (value) {
            setSessionState(true);
            await SecureStore.setItemAsync("session", "x3");
        } else {
            setSessionState(false);
            await SecureStore.deleteItemAsync("session");
            await SecureStore.deleteItemAsync("userName");
            await SecureStore.deleteItemAsync("publicKey");
            await SecureStore.deleteItemAsync("privateKey");
        }
    }

    const saveToStorage = async (key, value) => {
        switch(key) {
            case "session":
                setSession(value);
                break;
            case "userName":
                setUserName(value);
                console.log("userName");
                await SecureStore.setItemAsync("userName", value);
                break;
            case "publicKey":
                setPublicKey(value);
                await SecureStore.setItemAsync("publicKey", value);
                break;
            case "privateKey":
                setPrivateKey(value);
                await SecureStore.setItemAsync("privateKey", value);
                break;
            default:
                Alert.alert("Ошибка!", "Такого ключа не существует: " + key)
        }
    }

    return (
        <AppContext.Provider value={{
            session,
            isLoading,
            publicKey,
            privateKey,
            userName,
            saveToStorage
        }} >
            {props.children}
        </AppContext.Provider>
    )
}