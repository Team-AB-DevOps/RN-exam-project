import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../../../../contexts/AuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { app, storage } from "../../../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import ITale from "../../../../models/Tale";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TalePage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useAuth();
    const [imagePath, setImagePath] = React.useState<string>("");
    const [tale, setTale] = React.useState<ITale | null>(null);
    const [value, loading, error] = useDocument(doc(getFirestore(app), `${user!.uid}`, `${id}`), {
        snapshotListenOptions: { includeMetadataChanges: true },
    });
    const router = useRouter();

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

    const handleEdit = () => {
        router.push({
            pathname: "/edit",
            params: { tale: JSON.stringify(tale), id: id },
        });
    };

    return (
        <View className="flex-1 items-center">
            <Text>User: {user?.uid}</Text>
            <Text>Tale Page: Tale: {id}</Text>
            <Image className="w-36 h-36" src={imagePath} />
            {tale && (
                <View>
                    <Text>{tale.title}</Text>
                    <Text>{tale.description}</Text>
                    <Pressable onPress={handleEdit}>
                        <FontAwesome size={28} name="edit" color="black" />
                    </Pressable>
                </View>
            )}
        </View>
    );
}
