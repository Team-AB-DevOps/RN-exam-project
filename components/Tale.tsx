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
        <View {...props} className="border justify-center py-5 px-2 m-2">
            <Text>{props.tale.title}</Text>
        </View>
    );
};

export const TaleGridItem = (props: TaleDisplayProps) => {
    return (
        <View>
            <Text>TaleGridItem</Text>
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
