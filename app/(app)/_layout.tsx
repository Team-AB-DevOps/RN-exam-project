import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import React from "react";
import { Loading } from "../../components/Loading";


export default async function AppLayout() {
    const auth = useAuth();

    if (auth.isLoading) {
        console.log("LOADING");

        return <Loading />;
    }

    if (!auth.user) {
        return <Redirect href={"/auth"} />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
