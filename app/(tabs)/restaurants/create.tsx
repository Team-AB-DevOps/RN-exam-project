import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import RestaurantsEndpoint from "../../../services/RestaurantsEndpoint";

export default function CreateRestaurantPage() {
    const [input, setInput] = React.useState("");
    const router = useRouter();

    const onCreate = () => {
        // Create og gå tilbage til sidste side
        RestaurantsEndpoint.createRestaurant({ name: input });
        router.back();
    }

    return (
        <View>
            <Text className="pt-3 text-center">Create a new restaurant</Text>
            <TextInput returnKeyType="done" className="border p-3 m-3" value={input} onChangeText={setInput} />
            <Button title="Submit" onPress={onCreate} />
        </View>
    );
}
