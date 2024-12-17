import { Button, Image, ScrollView, View, Alert, Text } from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import ITale from "../../../../models/Tale";
import { MyTextInput } from "../../../../components/Input";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import TalesEndpoint from "../../../../services/TalesEndpoint";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigation, useRouter } from "expo-router";
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
    const [error, setError] = React.useState("");
    const { user } = useAuth();
    const router = useRouter();

    const navigation = useNavigation();

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

    const uploadImage = useCallback(
        async (name: string) => {
            try {
                const res = await fetch(imagePath);
                const blob = await res.blob();
                const storageRef = ref(storage, `${user?.uid!}/${name}`);

                await uploadBytesResumable(storageRef, blob);
            } catch (error) {
                console.log("Something went wrong: " + error);
            }
        },
        [imagePath, user?.uid],
    );

    const handleCamera = async () => {
        try {
            const { status, granted, canAskAgain } = await ImagePicker.requestCameraPermissionsAsync();

            if (status === "granted" || granted) {
                const result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [3, 4],
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

    const handleSubmit = React.useCallback(async () => {
        if (tale.title.length < 5) {
            setError("Title must be last 5 characters");
            return;
        }

        if (tale.description.length < 10) {
            setError("Description must be last 10 characters");
            return;
        }

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
    }, [router, tale, uploadImage, user]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button onPress={handleSubmit} title="Create" disabled={!imagePath} />,
        });
    }, [navigation, imagePath, handleSubmit]);

    return (
        <ScrollView className="flex-1 bg-blue-300 dark:bg-gray-800" contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
            {imagePath ? (
                <View className="flex justify-evenly items-center">
                    <Image className="size-80 mb-3 rounded-md" source={{ uri: imagePath }} />
                    <Button title="Remove" color="red" onPress={() => setImagePath("")} />
                </View>
            ) : (
                <View className="flex justify-evenly items-center h-48 pt-7">
                    <Button title="Select Image" onPress={handleAlbum} />
                    <Text>Or</Text>
                    <Button title="Take a new image" onPress={handleCamera} />
                </View>
            )}
            <View className="flex items-center mt-10">
                <MyTextInput label="Title" value={tale.title} textAlign="center" onChangeText={(title) => setTale((prev) => ({ ...prev, title }))} />
                <MyTextInput
                    label="Description"
                    value={tale.description}
                    multiline
                    textAlignVertical="top"
                    placeholder="Description must be at least 10 characters"
                    className="h-32"
                    onChangeText={(description) => setTale((prev) => ({ ...prev, description }))}
                />
                {error && <Text>{error}</Text>}
            </View>
        </ScrollView>
    );
}
