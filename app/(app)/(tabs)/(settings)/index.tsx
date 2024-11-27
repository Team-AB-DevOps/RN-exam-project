import { View, Text, Button } from "react-native";
import React from "react";
import { DarkModeSwitch } from "../../../../components/Switch";
import { useAuth } from "../../../../contexts/AuthContext";

export default function SettingsPage() {
    const auth = useAuth();

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="pt-3 text-center text-5xl font-bold mb-8 dark:text-red-500">Settings</Text>
            <View>
                <DarkModeSwitch />
                <Button title="log out" onPress={() => auth.signOut()} />
            </View>
        </View>
    );
}
