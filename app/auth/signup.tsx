import { Button, Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
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
        if (signup.password !== signup.password2) {
            setError("Passwords are not identical");
            return;
        }

        try {
            const isSuccess = await auth.signUp(signup.email, signup.password);
            setSignup(INIT_FORM);
            if (isSuccess) {
                router.replace("/");
            }
        } catch (error) {
            console.log("Could not sign up user" + error);
            setError("Something went wrong, try again");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 items-center gap-y-20 dark:bg-gray-800">
                <Text className="text-center mt-20 text-5xl font-bold">Sign Up</Text>
                <View className="">
                    <MyTextInput
                        label="E-mail"
                        returnKeyType="done"
                        value={signup.email}
                        onChangeText={(v) => setSignup((prev) => ({ ...prev, email: v }))}
                        textAlign="center"
                    />

                    <MyTextInput
                        label="Password"
                        returnKeyType="done"
                        value={signup.password}
                        onChangeText={(v) => setSignup((prev) => ({ ...prev, password: v }))}
                        textAlign="center"
                        secureTextEntry={true}
                        placeholder="Minimum 6 characters"
                    />
                    <MyTextInput
                        label="Password (Repeat)"
                        returnKeyType="done"
                        value={signup.password2}
                        onChangeText={(v) => setSignup((prev) => ({ ...prev, password2: v }))}
                        textAlign="center"
                        secureTextEntry={true}
                        placeholder="Minimum 6 characters"
                    />
                    <View className="mt-6">
                        <Button title="Register" onPress={onSignup} />
                        {error && <Text className="text-center mt-3">{error}</Text>}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
