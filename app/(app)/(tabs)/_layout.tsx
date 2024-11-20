import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useStyling } from "../../../contexts/StyleContext";
import { useAuth } from "../../../contexts/AuthContext";

// Vi fortæller hvordan vores tab naviagtion skal se ud.
export default function TabLayout() {
    const { theme } = useStyling();
    const { user } = useAuth();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "blue",
                tabBarStyle: { backgroundColor: theme.tabBackground },
                headerStyle: { backgroundColor: theme.tabBackground },
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="(map)"
                options={{
                    title: "Map",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-marker" color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="(settings)"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
