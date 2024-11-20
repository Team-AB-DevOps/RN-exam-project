import { Button, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function UserPage() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center items-center">
            <View className="flex-1 items-center justify-evenly">
                <Button title="Login" onPress={() => router.navigate("/auth/login")} />
                <Button title="Signup" onPress={() => router.navigate("/auth/signup")} />
            </View>
        </View>
    );
}
