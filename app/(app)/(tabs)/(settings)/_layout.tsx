import React from "react";
import { Stack } from "expo-router";
import { useStyling } from "../../../../contexts/StyleContext";

export default function SettingsLayout() {
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
                    headerShown: true,
                    headerTitle: "Settings",
                }}
            />
        </Stack>
    );
}
