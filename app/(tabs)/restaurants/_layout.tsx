import React from "react";
import { Stack } from "expo-router";
import { useStyling } from "../../../contexts/StyleContext";

export default function _layout() {
    const { theme } = useStyling();
    return (
        <Stack screenOptions={{ headerStyle: { backgroundColor: theme.tabBackground } }}>
            <Stack.Screen
                name="index"
                options={{
                    title: "Restaurants",
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Restaurant Details",
                }}
            />
            <Stack.Screen
                name="create"
                options={{
                    title: "Create Restaurant",
                }}
            />
        </Stack>
    );
}
