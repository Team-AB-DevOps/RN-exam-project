import { Stack } from "expo-router/stack";
import StyleProvider from "../contexts/StyleContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../contexts/AuthContext";
import { Slot } from "expo-router";

// Vi fortæller, at vores root layout består af tabs
export default function RootLayout() {
    return (
        <AuthProvider>
            <StyleProvider>
                <GestureHandlerRootView className="flex-1">
                    <Stack>
                        <Stack.Screen name="auth" options={{ headerShown: false }} />
                        <Stack.Screen name="(app)" options={{ headerShown: false }} />
                    </Stack>
                </GestureHandlerRootView>
            </StyleProvider>
        </AuthProvider>
    );
}
