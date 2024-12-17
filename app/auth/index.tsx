import { Button, View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { MyTextInput } from "../../components/Input";

const INIT_FORM = {
    email: "",
    password: "",
};

export default function LoginPage() {
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
            setError("Something went wrong, try again");
        }
    };

    return (
        <View className="flex-1 items-center justify-evenly dark:bg-gray-800">
            <View>
                <Text className="pt-3 text-center text-5xl font-bold mb-8">Log-in</Text>

                <MyTextInput
                    label="E-mail"
                    returnKeyType="done"
                    value={login.email}
                    onChangeText={(v) => setLogin((prev) => ({ ...prev, email: v }))}
                    textAlign="center"
                />

                <MyTextInput
                    label="Password"
                    returnKeyType="done"
                    value={login.password}
                    onChangeText={(v) => setLogin((prev) => ({ ...prev, password: v }))}
                    textAlign="center"
                    secureTextEntry
                />

                <Button title="Log in" onPress={onLogin} />
                {error && <Text className="text-center mt-3">{error}</Text>}
            </View>
            <View>
                <Text>Don't have an account?</Text>
                <Button title="Sign Up" onPress={() => router.navigate("/auth/signup")} />
            </View>
        </View>
    );
}
