import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../../../contexts/AuthContext";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../../firebase";

export default function TalePage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useAuth();
    const [imagePath, setImagePath] = React.useState<string>("");

    React.useEffect(() => {
        const fetchImage = async () => {
            const storageRef = ref(storage, `${user?.uid}/${id}/`);
            const url = await getDownloadURL(storageRef);
            console.log(url);
            setImagePath(url);
        };
        fetchImage();

        // listAll(storageRef)
        //     .then((result) => {
        //         // Fetch URLs for all images
        //         const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
        //         Promise.all(urlPromises).then((urls) => setImagePath(urls));
        //     })
        //     .catch(() => console.log("No Images found"));
    }, [id, user?.uid]);

    return (
        <View className="flex-1 items-center">
            <Text>User: {user?.uid}</Text>
            <Text>Tale Page: Tale: {id}</Text>
            <Image className="w-36 h-36" src={imagePath} />
        </View>
    );
}
