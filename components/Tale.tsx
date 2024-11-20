import { View, Text, ViewProps } from "react-native";
import React from "react";
import ITale from "../models/Tale";

interface TaleDisplayProps extends ViewProps {
    tale: ITale;
    onSwipeRight?: (id: string) => void; // Delete
    onPress?: (id: string) => void;
}

export const TaleListItem = (props: TaleDisplayProps) => {
    return (
        <View {...props} className="border rounded-md m-2 p-4">
            <Text className="font-semibold">{props.tale.title}</Text>
            <Text className="text-sm text-gray-600">{props.tale.description}</Text>
        </View>
    );
};

export const TaleGridItem = (props: TaleDisplayProps) => {
    return (
        <View {...props} className="border rounded-md p-2 w-[47%]">
            <Text className="font-semibold">{props.tale.title}</Text>
            <Text className="text-sm text-gray-600">{props.tale.description}</Text>
        </View>
    );
};

export const DetailedTale = () => {
    return (
        <View>
            <Text>DetailedTale</Text>
        </View>
    );
};
