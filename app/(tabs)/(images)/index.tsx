import { Button, Image, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject, uploadBytesResumable } from "firebase/storage";

export default function ImagesPage() {
    const [isFetched, setIsFetched] = React.useState(false);
    const [imagePath, setImagePath] = React.useState("");

    React.useEffect(() => {
        getDownloadURL(ref(storage, `image_ali`))
            .then((url) => {
                setImagePath(url);
                setIsFetched(true);
            })
            .catch(() => console.log("No image in backend"));
    }, []);

    const handleClick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (result.canceled) {
            console.log("User clicked on cancel");
            return;
        }

        setImagePath(result.assets[0].uri);
    };

    const handleUpload = async () => {
        const res = await fetch(imagePath);
        const blob = await res.blob();
        const storageRef = ref(storage, `image_ali`);

        await uploadBytesResumable(storageRef, blob);

        setIsFetched(true);
        alert("Image uploaded!");
    };

    const launchCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.granted === false) {
            alert("Camera access not provded");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            // Options
            quality: 1, // ikke nødvendig
        });

        if (result.canceled) {
            return;
        }
        
        setImagePath(result.assets[0].uri);
        setIsFetched(false);
    };

    const handleDelete = async () => {
        const storageRef = ref(storage, `image_ali`);
        deleteObject(storageRef)
            .then(() => {
                setImagePath("");
                setIsFetched(false);
            })
            .then(() => alert("Deleted image"))
            .catch(() => console.log("Something went wrong"));
    };

    return (
        <View className="flex flex-1 items-center">
            {imagePath && (
                <View className="mt-5">
                    <Image className="w-72 h-72" source={{ uri: imagePath }} />
                    {!isFetched ? (
                        <Button onPress={handleUpload} title="Upload to Firebase Storage" />
                    ) : (
                        <Button onPress={handleDelete} color="red" title="Delete" />
                    )}
                </View>
            )}
            <View className="flex-1 justify-center">
                <Button onPress={handleClick} title="Pick image" />
                <Button title="Take Picture" onPress={launchCamera} />
            </View>
        </View>
    );
}
