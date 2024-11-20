import { Button, Text, TextInput, View } from "react-native";
import React from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

const INIT_FORM = {
    email: "",
    password: "",
};

export default function SignupPage() {
    const [signup, setSignup] = React.useState(INIT_FORM);
    const router = useRouter();

    const onSignup = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, signup.email, signup.password);
            //userCredentials.user
            setSignup(INIT_FORM);
            router.back();
        } catch (error) {
            console.log("Could not sign up user" + error);
        }
    };

    return (
        <View>
            <Text className="pt-3 text-center">Create user</Text>

            <Text className="pt-3 text-center">Email</Text>
            <TextInput
                returnKeyType="done"
                className="border p-3 m-3"
                value={signup.email}
                onChangeText={(v) => setSignup((prev) => ({ ...prev, email: v }))}
            />
            <Text className="pt-3 text-center">Password</Text>
            <TextInput
                returnKeyType="done"
                className="border p-3 m-3"
                value={signup.password}
                onChangeText={(v) => setSignup((prev) => ({ ...prev, password: v }))}
            />
            <Button title="Submit" onPress={onSignup} />
        </View>
    );
}
