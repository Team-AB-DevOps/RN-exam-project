import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

// Vi fortæller, at vores root layout består af tabs
export default function AppLayout() {
    const auth = useAuth();

    if (!auth.user) {
        return <Redirect href={"/auth"} />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
