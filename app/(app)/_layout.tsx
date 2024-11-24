import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import React, { useState, useEffect } from "react";
import { Loading } from "../../components/Loading";

// Vi fortæller, at vores root layout består af tabs
export default function AppLayout() {
    const [isReady, setIsReady] = useState(false);
    const auth = useAuth();

    // 1000ms delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 1000);

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    if (!isReady || auth.isLoading) {
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
