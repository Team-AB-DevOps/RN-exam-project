import { Button, Text, View } from "react-native";
import React from "react";
import { auth } from "../../../firebase";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";

export default function UserPage() {
    const [user, setUser] = React.useState(auth.currentUser);
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        // Får den til at re-render denne side.
        setUser(user);
    });

    const handleLogout = async () => {
        await auth.signOut();
    };

    return (
        <View className="flex-1">
            {user ? (
                <View>
                    <Text className="text-center">Hello {user.email}</Text>
                    <Button title="Log out" color="red" onPress={handleLogout} />
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
