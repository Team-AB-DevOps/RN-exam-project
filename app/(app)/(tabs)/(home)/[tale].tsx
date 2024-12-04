import { View, Text, Image, Pressable, ScrollView, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useAuth } from "../../../../contexts/AuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { app, storage } from "../../../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import ITale from "../../../../models/Tale";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TalesEndpoint from "../../../../services/TalesEndpoint";

export default function TalePage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useAuth();
    const [imagePath, setImagePath] = React.useState<string>("");
    const [tale, setTale] = React.useState<ITale | null>(null);
    const [value, loading, error] = useDocument(doc(getFirestore(app), `${user!.uid}`, `${id}`), {
        snapshotListenOptions: { includeMetadataChanges: true },
    });
    const router = useRouter();
    const navigation = useNavigation();

    React.useEffect(() => {
        const fetchImage = async () => {
            const storageRef = ref(storage, `${user?.uid}/${id}/`);
            const url = await getDownloadURL(storageRef);
            setImagePath(url);
        };

        fetchImage();

        if (value) {
            setTale(value.data() as ITale);
        }
    }, [id, user?.uid, value]);

    const handleEdit = React.useCallback(() => {
        router.push({
            pathname: "/edit",
            params: { tale: JSON.stringify(tale), id: id },
        });
    }, [id, router, tale]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button onPress={handleEdit} title="Edit" />,
        });
    }, [navigation, handleEdit]);

    return (
        <ScrollView className="flex-1 dark:bg-gray-800">
            <Image className="w-full h-80" src={imagePath} />
            {tale && (
                <View className="mx-4">
                    <Text className="font-extrabold text-3xl text-center my-3">{tale.title}</Text>
                    <Text className="text-center text-lg">{tale.description}</Text>
                    <View className="flex-1 flex-row justify-around my-4"></View>
                </View>
            )}
        </ScrollView>
    );
}
