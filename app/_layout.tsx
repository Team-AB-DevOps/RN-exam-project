import { Stack } from "expo-router/stack";
import StyleProvider from "../contexts/StyleContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Vi fortæller, at vores root layout består af tabs
export default function RootLayout() {
    return (
        <StyleProvider>
            <GestureHandlerRootView  className="flex-1">
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </GestureHandlerRootView>
        </StyleProvider>
    );
}

