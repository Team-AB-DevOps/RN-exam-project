import { View, Text, Button, Pressable } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import ITale from "../../../../models/Tale";
import TalesEndpoint from "../../../../services/TalesEndpoint";
import { useAuth } from "../../../../contexts/AuthContext";
import { MyTextInput } from "../../../../components/Input";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function EditTalePage() {
    const [editedTale, setEditedTale] = React.useState<null | ITale>(null);
    const [error, setError] = React.useState("");
    const { tale, id } = useLocalSearchParams<{ tale: string; id: string }>();
    const { user } = useAuth();
    const router = useRouter();
    const navigation = useNavigation();

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

    const handleDelete = async () => {
        try {
            await TalesEndpoint.deleteTale(user?.uid!, id);
            router.back();
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    };

    const handleEdit = useCallback(async () => {
        if (!editedTale) {
            console.log("No tale to edit");
            return;
        }

        if (editedTale.title.length < 5) {
            setError("Title must be last 5 characters");
            return;
        }

        if (editedTale.description.length < 10) {
            setError("Description must be last 10 characters");
            return;
        }

        try {
            await TalesEndpoint.updateTale(user?.uid!, id, editedTale);
            router.back();
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    }, [editedTale, id, router, user?.uid]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button onPress={handleEdit} title="Submit" />,
        });
    }, [navigation, handleEdit]);

    return (
        <>
            {editedTale && (
                <View className="flex-1 justify-evenly dark:bg-gray-800">
                    <View className="flex items-center">
                        <MyTextInput
                            label="Title"
                            value={editedTale.title}
                            onChangeText={(value) => editTale("title", value)}
                            placeholder="Title must be at least 5 characters"
                            textAlign="center"
                        />
                        <MyTextInput
                            label="Description"
                            value={editedTale.description}
                            onChangeText={(value) => editTale("description", value)}
                            placeholder="Description must be at least 10 characters"
                            multiline
                            maxLength={500}
                        />
                        {error && <Text>{error}</Text>}
                    </View>
                    <View className="flex flex-col justify-center items-center">
                        <Button title="Delete Tale" onPress={handleDelete} color="red" />
                    </View>
                </View>
            )}
        </>
    );
}
