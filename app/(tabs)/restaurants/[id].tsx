import { View, Text, Button, TextInput, Image, ScrollView } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import RestaurantsEndpoint from "../../../services/RestaurantsEndpoint";

export default function RestaurantPage() {
    const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
    const [input, setInput] = React.useState(name);
    const [imagePaths, setImagePaths] = React.useState<string[]>([]);
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        // Fetch all images related to the restaurant
        const storageRef = ref(storage, `restaurant_images/${id}/`);
        listAll(storageRef)
            .then((result) => {
                // Fetch URLs for all images
                const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
                Promise.all(urlPromises).then((urls) => setImagePaths(urls));
            })
            .catch(() => console.log("No Images found"));
    }, [id]);

    const handleEdit = () => {
        // Update restaurant details and navigate back
        RestaurantsEndpoint.updateRestaurant(id, { name: input });
        router.back();
    };

    const handleDelete = async (imageURL: string) => {
        // Delete a specific image from Firebase Storage
        const imageRef = ref(storage, imageURL);

        deleteObject(imageRef)
            .then(() => {
                setImagePaths((prev) => prev.filter((url) => url !== imageURL));
                alert("Image deleted");
            })
            .catch(() => console.log("Could not delete image"));
    };

    const handleUpload = async () => {
        // Select multiple images from the gallery
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
        });

        if (result.canceled) {
            console.log("User clicked on cancel");
            return;
        }

        const uploadPromises = result.assets.map(async (asset, index) => {
            const imageUri = asset.uri;
            const res = await fetch(imageUri);
            const blob = await res.blob();
            const imageRef = ref(storage, `restaurant_images/${id}/image_${Date.now()}_${index}.jpg`);

            // Upload each image
            await uploadBytes(imageRef, blob);
            return getDownloadURL(imageRef); // Return the download URL of the image
        });

        const uploadedImageUrls = await Promise.all(uploadPromises);
        setImagePaths((prev) => [...prev, ...uploadedImageUrls]); // Add new image URLs to the state
        alert("Images uploaded!");
    };

    return (
        <View className="flex flex-1 justify-center items-center">
            <Stack.Screen
                options={{
                    headerTitle: "Restaurant " + name,
                }}
            />
            {!isEditing ? (
                <>
                    <ScrollView horizontal>
                        {imagePaths.map((imagePath, index) => (
                            <Image key={index} className="w-28 h-28 mr-2" source={{ uri: imagePath }} />
                        ))}
                    </ScrollView>
                    <Text>Name: {name}</Text>
                    <Button title="Edit" onPress={() => setIsEditing(true)} />
                </>
            ) : (
                <>
                    <ScrollView horizontal>
                        {imagePaths.map((imagePath, index) => (
                            <View key={index} className="mr-2">
                                <Image className="w-28 h-28" source={{ uri: imagePath }} />
                                <Button color="red" title="Delete Image" onPress={() => handleDelete(imagePath)} />
                            </View>
                        ))}
                    </ScrollView>
                    <View className="mb-5">
                        <Button title="Upload Images" onPress={handleUpload} />
                    </View>
                    <View>
                        <TextInput className="border m-3 p-2" value={input} onChangeText={setInput} />
                        <Button title="Finish" onPress={handleEdit} />
                    </View>
                </>
            )}
        </View>
    );
}
