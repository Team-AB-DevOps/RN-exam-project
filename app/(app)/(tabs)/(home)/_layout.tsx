import React from "react";
import { Stack } from "expo-router";
import { useStyling } from "../../../../contexts/StyleContext";

export default function HomeLayout() {
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
                    title: "Home",
                }}
            />
            <Stack.Screen
                name="create"
                options={{
                    title: "Create Tale",
                }}
            />
            <Stack.Screen
                name="[tale]"
                options={{
                    title: "Tale",
                }}
            />
            <Stack.Screen
                name="edit"
                options={{
                    title: "Edit Tale",
                }}
            />
        </Stack>
    );
}
