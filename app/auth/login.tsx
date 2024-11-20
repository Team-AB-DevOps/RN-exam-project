import { Button, Text, TextInput, View } from "react-native";
import React from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const INIT_FORM = {
    email: "",
    password: "",
};

export default function LoginPage() {
    const [login, setLogin] = React.useState(INIT_FORM);
    const router = useRouter();
    const auth = useAuth();

    const onLogin = async () => {
        try {
            auth.login(login.email, login.password);
            setLogin(INIT_FORM);
        } catch (error) {
            console.log("Could not login user" + error);
        }
    };

    return (
        <View className="mt-5">
            <Text className="pt-3 text-center">Login user</Text>

            <Text className="pt-3 text-center">Email</Text>
            <TextInput returnKeyType="done" className="border p-3 m-3" value={login.email} onChangeText={(v) => setLogin((prev) => ({ ...prev, email: v }))} />
            <Text className="pt-3 text-center">Password</Text>
            <TextInput
                returnKeyType="done"
                className="border p-3 m-3"
                value={login.password}
                onChangeText={(v) => setLogin((prev) => ({ ...prev, password: v }))}
            />
            <Button title="Submit" onPress={onLogin} />
        </View>
    );
}
