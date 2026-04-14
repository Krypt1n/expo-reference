import { Alert, Button, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import ImageViewer from '../components/ImageViewer';
import StyledButton from '../components/StyledButton';
import StyledText from '../components/StyledText';
import StyledTextInput from '../components/StyledTextInput';
import { COLORS } from '../constants/colors';
import * as ImagePicker from "expo-image-picker";
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { generateKeyPair } from '../utils/keyPair';

const defaultImage = require('../assets/download-icon-160x160.png');

export default function SignIn() {
  const [userNameInput, setUserNameInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const {saveToStorage} = useContext(AppContext)

  // Настройки для отображения клавиатуры
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', (event) => {
      setKeyboardVisible(true)
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardVisible(false)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Функция для выбора изображения с помощью expo-image-picker
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  // Обработка нажатия кнопки регистрации
  const handleContinuePress = () => {
    if (userNameInput.length < 3) {
      Alert.alert("Ошибка!", "Имя пользователя не валидно.\n(минимум 3 символа)")
      return;
    }

    //...
    const keyPair = generateKeyPair();
    saveToStorage("userName", userNameInput);
    saveToStorage("publicKey", keyPair.public_key);
    saveToStorage("privateKey", keyPair.private_key);

    const initializationMessage = {
      userName: userNameInput,
      publicKey: keyPair.public_key,
      privateKey: keyPair.private_key
    }
    //...
    
    saveToStorage("session", true);
    router.replace("/")
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >

        <View style={[styles.container, {
          paddingBottom: keyboardVisible ? 160 : 0
        }]}>

          <View style={styles.ava} >
            <ImageViewer selectedImage={selectedImage} defaultImage={defaultImage} onPress={pickImageAsync} />
          </View>

          <StyledTextInput placeholder='Имя пользователя...' value={userNameInput} onChangeText={setUserNameInput} />

          <StyledButton variant='secondary' onPress={handleContinuePress}>
            <StyledText variant='button' bold>Продолжить</StyledText>
          </StyledButton>

          <Button title='Назад' onPress={() => {
            router.replace("/welcome")
          }} />

        </View>
        
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY_BACKGROUND
  },
  ava: {
    marginBottom: 33,
    backgroundColor: COLORS.SECONDARY_BUTTON,
    borderRadius: 50
  }
})
