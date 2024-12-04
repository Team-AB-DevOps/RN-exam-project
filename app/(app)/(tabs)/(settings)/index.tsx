import { View, Button, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { DarkModeSwitch } from "../../../../components/Switch";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigation } from "expo-router";
import { Option } from "../../../../components/Option";

export default function SettingsPage() {
    const auth = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button onPress={() => auth.signOut()} title="Log out" color="red" />,
        });
    }, [navigation, auth]);

    return (
        <View className="flex-1 justify-between dark:bg-gray-800">
            <View className="flex gap-y-2 mt-3">
                <Option lable="Dark mode">
                    <DarkModeSwitch />
                </Option>
            </View>
            <View className="mb-5">
                <Text className="text-center">
                    Logged in as <Text className="font-semibold">{auth.user?.email}</Text>
                </Text>
            </View>
        </View>
    );
}
