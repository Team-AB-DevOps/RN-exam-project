import React from "react";
import { Stack } from "expo-router";

export default function UserLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Profile",
                }}
            />
            <Stack.Screen
                name="login"
                options={{
                    title: "Login User",
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
