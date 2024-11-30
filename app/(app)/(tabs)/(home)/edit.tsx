import { View, Text, TextInput, Pressable, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ITale from "../../../../models/Tale";
import TalesEndpoint from "../../../../services/TalesEndpoint";
import { useAuth } from "../../../../contexts/AuthContext";
import { MyTextInput } from "../../../../components/Input";

export default function EditTalePage() {
    const [editedTale, setEditedTale] = useState<null | ITale>(null);
    const { tale, id } = useLocalSearchParams<{ tale: string; id: string }>();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (tale) {
            try {
                const jsonTale = JSON.parse(tale) as ITale;
                setEditedTale(jsonTale);
            } catch (error) {
                console.error("Failed to parse tale:", error);
            }
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
                <View className="flex-1 justify-evenly">
                    <View className="flex items-center">
                        <MyTextInput
                            label="Title"
                            value={editedTale.title}
                            onChangeText={(value) => editTale("title", value)}
                            placeholder="Title must be at least 3 character"
                        />
                        <MyTextInput
                            label="Description"
                            value={editedTale.description}
                            onChangeText={(value) => editTale("description", value)}
                            placeholder="Description must be at least 10 character"
                            className="h-44"
                        />
                    </View>
                    <View className="mb-5">
                        <Button title="Submit" onPress={handleEdit} />
                    </View>
                </View>
            )}
        </>
    );
}
