import { Button, TextInput, View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const INIT_FORM = {
    email: "",
    password: "",
};

export default function UserPage() {
    const [login, setLogin] = React.useState(INIT_FORM);
    const [error, setError] = React.useState("");
    const router = useRouter();
    const auth = useAuth();

    const onLogin = async () => {
        try {
            const isSuccess = await auth.login(login.email, login.password);
            setLogin(INIT_FORM);
            if (isSuccess) {
                router.replace("/");
            }
        } catch (error) {
            console.log("Could not login user" + error);
            setError("Something went wrong");
        }
    };

    return (
        <View className="flex-1 justify-center items-center">
            <View className="flex-1 items-center justify-evenly">
                <View className="mt-5">
                    <Text className="pt-3 text-center">Login user</Text>

                    <Text className="pt-3 text-center">Email</Text>
                    <TextInput
                        returnKeyType="done"
                        className="border p-3 m-3"
                        value={login.email}
                        onChangeText={(v) => setLogin((prev) => ({ ...prev, email: v }))}
                    />

                    <Text className="pt-3 text-center">Password</Text>
                    <TextInput
                        returnKeyType="done"
                        className="border p-3 m-3"
                        value={login.password}
                        onChangeText={(v) => setLogin((prev) => ({ ...prev, password: v }))}
                    />
                    <Button title="Submit" onPress={onLogin} />
                </View>

                {error && <Text>{error}</Text>}

                <Button title="Signup" onPress={() => router.navigate("/auth/signup")} />
            </View>
        </View>
    );
}
