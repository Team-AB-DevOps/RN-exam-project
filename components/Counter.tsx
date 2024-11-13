import { Button, Text, View } from "react-native";
import React from "react";

export const Counter = () => {
    const [count, setCount] = React.useState(0);

    return (
        <View className="flex-column items-center justify-around">
            <View>
                <Text className="text-xl">Count: {count}</Text>
            </View>
            <View className="flex-row ">
                <Button color="red" title="Decrease" onPress={() => setCount((prev) => prev - 1)} />
                <Button title="Increase" onPress={() => setCount((prev) => prev + 1)} />
            </View>
        </View>
    );
};
