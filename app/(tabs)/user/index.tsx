import { ActivityIndicator, Button, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth, database } from "../../../firebase";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import INote from "../../../models/Note";
import { RestaurantCard } from "../../../components/RestaurantCard";
import NotesEndpoint from "../../../services/NotesEndpoint";

export default function UserPage() {
    const [user, setUser] = React.useState(auth.currentUser);
    const [newNote, setNewNote] = React.useState("");
    const [values, loading, error] = useCollection(collection(database, `${user?.uid}`));
    const notes = values?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as INote[];
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        // Får den til at re-render denne side.
        setUser(user);
    });

    const handleLogout = async () => {
        await auth.signOut();
    };

    const onCreate = async () => {
        const value = newNote;
        setNewNote("");
        await NotesEndpoint.createNote(user?.uid!, { value });
    };

    const handleDelete = async (noteId: string) => {
        await NotesEndpoint.deleteNote(user?.uid!, noteId);
    };

    return (
        <View className="flex-1">
            {user ? (
                <View>
                    <Text className="text-center">Hello {user.email}</Text>
                    <Button title="Log out" color="red" onPress={handleLogout} />
                    <ScrollView className="flex gap-2">
                        {loading ? (
                            <ActivityIndicator size={"large"} />
                        ) : (
                            notes.map((n) => (
                                <View className="flex flex-row" key={n.id}>
                                    <RestaurantCard className="mx-2 w-80" name={n.value} />
                                    <TouchableOpacity className="flex justify-center items-center" onPress={() => handleDelete(n.id)}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        )}
                    </ScrollView>
                    <View>
                        <Text className="pt-3 text-center">Create note</Text>
                        <TextInput returnKeyType="done" className="border p-3 m-3" value={newNote} onChangeText={setNewNote} />
                        <Button title="Submit" onPress={onCreate} />
                    </View>
                </View>
            ) : (
                <View className="flex-1 items-center justify-evenly">
                    <Button title="Login" onPress={() => router.navigate("/user/login")} />
                    <Button title="Signup" onPress={() => router.navigate("/user/signup")} />
                </View>
            )}
        </View>
    );
}
