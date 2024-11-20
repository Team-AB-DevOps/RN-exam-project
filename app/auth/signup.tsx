import { Button, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { MyTextInput } from "../../components/Input";


const INIT_FORM = {
    email: "",
    password: "",
    password2: "",
};

export default function SignupPage() {
    const [signup, setSignup] = React.useState(INIT_FORM);
    const [error, setError] = React.useState("");
    const auth = useAuth();
    const router = useRouter();

    const onSignup = async () => {
        try {
            const isSuccess = await auth.signUp(signup.email, signup.password);
            setSignup(INIT_FORM);
            if (isSuccess) {
                router.replace("/");
            }
        } catch (error) {
            console.log("Could not sign up user" + error);
            setError("Something went wrong");
        }
    };

    return (
        <View>
            <Text className="pt-3 text-center">Create user</Text>

            <MyTextInput
                label="E-mail"
                returnKeyType="done"
                className="border p-3 m-3"
                value={signup.email}
                onChangeText={(v) => setSignup((prev) => ({ ...prev, email: v }))}
            />

            <MyTextInput
                returnKeyType="done"
                label="Password"
                secureTextEntry
                value={signup.password}
                onChangeText={(v) => setSignup((prev) => ({ ...prev, password: v }))}
            />

            <MyTextInput
                returnKeyType="done"
                label="Password (repeat)"
                secureTextEntry
                value={signup.password2}
                onChangeText={(v) => setSignup((prev) => ({ ...prev, password2: v }))}
            />

            {error && <Text>{error}</Text>}

            <Button title="Submit" onPress={onSignup} />
        </View>
    );
}
