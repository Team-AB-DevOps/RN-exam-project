import { View, Image } from "react-native";
import React from "react";

export const Loading = () => {
    return (
        <View className="flex-1">
            <Image className="w-full h-full" source={require("../assets/splash.png")} />
        </View>
    );
};
