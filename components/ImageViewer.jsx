import { Image, Pressable, StyleSheet } from 'react-native';

const ImageViewer = ({defaultImage, selectedImage, onPress}) => {
    const imageSource = selectedImage ? { uri: selectedImage } : defaultImage;
    return (
        <Pressable onPress={onPress} >
            <Image source={imageSource} style={styles.image} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        resizeMode: "center",
    },
});

export default ImageViewer;
