import { View, Text } from "react-native";
import React from "react";
import { DarkModeSwitch } from "../../../../components/Switch";

export default function SettingsPage() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-center dark:text-red-500">Settings page</Text>
            <View>
                <Text>Hello</Text>
                <DarkModeSwitch />
            </View>
        </View>
    );
}
