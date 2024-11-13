import React from "react";
import { Stack } from "expo-router";

export default function ImagesLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Images",
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
