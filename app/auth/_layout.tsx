import React from "react";
import { Stack } from "expo-router";
import { useStyling } from "../../contexts/StyleContext";

export default function UserLayout() {
    const { theme } = useStyling();
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: theme.tabBackground },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="signup"
                options={{
                    title: "Create new user",
                }}
            />
        </Stack>
    );
}
