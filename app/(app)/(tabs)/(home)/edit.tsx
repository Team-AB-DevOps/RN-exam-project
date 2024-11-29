import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ITale from "../../../../models/Tale";
import TalesEndpoint from "../../../../services/TalesEndpoint";
import { useAuth } from "../../../../contexts/AuthContext";

export default function EditTalePage() {
    const [editedTale, setEditedTale] = useState<null | ITale>(null);
    const { tale, id } = useLocalSearchParams<{ tale: string; id: string }>();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (tale) {
            const jsonTale = JSON.parse(tale) as ITale;
            setEditedTale(jsonTale);
            console.log(tale);
        }
    }, [tale]);

    const editTale = (property: string, value: string) => {
        setEditedTale((prevTale) => {
            if (!prevTale) return prevTale;
            return { ...prevTale, [property]: value };
        });
    };

    const handleEdit = async () => {
        if (!editedTale) {
            console.log("No tale to edit");
            return;
        }

        // console.log(editedTale);
        // console.log("id:", id);
        // console.log("user:", user?.uid);

        try {
            await TalesEndpoint.updateTale(user?.uid!, id, editedTale);
            router.back();
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    };

    return (
        <>
            {editedTale && (
                <View>
                    <Text>edit</Text>
                    <TextInput value={editedTale?.title} onChangeText={(value) => editTale("title", value)} />
                    <TextInput value={editedTale?.description} onChangeText={(value) => editTale("description", value)} />
                    <Pressable onPress={handleEdit}>
                        <Text className="bg-red-300">Edit</Text>
                    </Pressable>
                </View>
            )}
        </>
    );
}
