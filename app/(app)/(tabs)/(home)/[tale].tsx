import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../../../contexts/AuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { app, storage } from "../../../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import ITale from "../../../../models/Tale";

export default function TalePage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useAuth();
    const [imagePath, setImagePath] = React.useState<string>("");
    const [tale, setTale] = React.useState<ITale | null>(null);
    // const [values, loading, error] = useCollection(collection(database, `${user!.uid}`));
    const [value, loading, error] = useDocument(doc(getFirestore(app), `${user!.uid}`, `${id}`), {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

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

    return (
        <View className="flex-1 items-center">
            <Text>User: {user?.uid}</Text>
            <Text>Tale Page: Tale: {id}</Text>
            <Image className="w-36 h-36" src={imagePath} />
            {tale && (
                <View>
                    <Text>{tale.title}</Text>
                    <Text>{tale.description}</Text>
                </View>
            )}
        </View>
    );
}
