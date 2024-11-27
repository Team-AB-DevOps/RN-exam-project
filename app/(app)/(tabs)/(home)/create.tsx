import { Button, Image, ScrollView, View, Alert } from "react-native";
import React from "react";
import ITale from "../../../../models/Tale";
import { DateInput, MyTextInput } from "../../../../components/Input";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import TalesEndpoint from "../../../../services/TalesEndpoint";
import { useAuth } from "../../../../contexts/AuthContext";
import { useRouter } from "expo-router";
import { storage } from "../../../../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

const INIT_TALE: ITale = {
    title: "",
    description: "",
    date: new Date(),
    coordinate: { latitude: 0, longitude: 0 },
};

export default function CreateTalePage() {
    const [tale, setTale] = React.useState<ITale>(INIT_TALE);
    const [imagePath, setImagePath] = React.useState("");
    const { user } = useAuth();
    const router = useRouter();

    const getUserCoordinates = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "denied") {
                Alert.alert("Permission Denied", "We need permission for your location to complete the form. Would you like share your location?", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Enable", onPress: () => Location.requestForegroundPermissionsAsync() },
                ]);
            }

            const { coords } = await Location.getCurrentPositionAsync();
            return coords;
        } catch (error) {
            console.log("Something went wrong: " + error);
            throw error;
        }
    };

    const uploadImage = async (name: string) => {
        try {
            const res = await fetch(imagePath);
            const blob = await res.blob();
            const storageRef = ref(storage, `${user?.uid!}/${name}`);

            await uploadBytesResumable(storageRef, blob);
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    };

    const handleCamera = async () => {
        try {
            const { status, granted, canAskAgain } = await ImagePicker.requestCameraPermissionsAsync();

            if (status === "granted" || granted) {
                const result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                });

                if (result.canceled) return;

                setImagePath(result.assets[0].uri);
            } else if (status === "denied" && canAskAgain) {
                // Permission is denied but can be re-asked
                Alert.alert("Permission Denied", "We need permission to access your camera. Would you like to enable it?", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Enable", onPress: () => ImagePicker.requestCameraPermissionsAsync() },
                ]);
            } else {
                // Permission is denied permanently
                Alert.alert("Permission Required", "Camera access is required to take photos. Please enable it in your settings.");
            }
        } catch (error) {
            console.error("Error launching camera:", error);
        }
    };

    const handleAlbum = async () => {
        try {
            const { status, granted, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status === "granted" || granted) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                });

                if (result.canceled) return;

                setImagePath(result.assets[0].uri);
            } else if (status === "denied" && canAskAgain) {
                // Permission is denied but can be re-asked
                Alert.alert("Permission Denied", "We need permission to access your media library. Would you like to enable it?", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Enable", onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() },
                ]);
            } else {
                // Permission is denied permanently
                Alert.alert("Permission Required", "Access to the photo library is required to select an image. Please enable it in your settings.");
            }
        } catch (error) {
            console.error("Error selecting image from album:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const taleRequest = { ...tale };
            const { latitude, longitude } = await getUserCoordinates();

            taleRequest.coordinate = { latitude, longitude };
            taleRequest.date = new Date();
            taleRequest.id = await TalesEndpoint.createTale(user?.uid!, taleRequest);

            await uploadImage(taleRequest.id);

            setImagePath("");
            setTale(INIT_TALE);
            router.back();
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    };

    return (
        <ScrollView className="flex-1">
            {imagePath ? (
                <View className="flex justify-evenly items-center">
                    <Image className="h-80 w-80 mt-5" source={{ uri: imagePath }} />
                    <Button title="Remove" color="red" onPress={() => setImagePath("")} />
                </View>
            ) : (
                <View className="flex flex-row justify-evenly items-center h-60">
                    <Button title="Select Image" onPress={handleAlbum} />
                    <Button title="Take a new image" onPress={handleCamera} />
                </View>
            )}
            <View className="flex items-center">
                <MyTextInput label="Title" value={tale.title} onChangeText={(title) => setTale((prev) => ({ ...prev, title }))} />
                <MyTextInput label="Description" value={tale.description} onChangeText={(description) => setTale((prev) => ({ ...prev, description }))} />
            </View>
            <View className="mb-5">
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}
