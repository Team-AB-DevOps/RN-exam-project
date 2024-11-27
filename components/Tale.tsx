import { View, Text, ViewProps, Pressable } from "react-native";
import React from "react";
import ITale from "../models/Tale";

interface TaleDisplayProps extends ViewProps {
    tale: ITale;
    onSwipeRight?: (id: string) => void; // Delete
    onPress?: (id: string) => void;
}

export const TaleListItem = (props: TaleDisplayProps) => {
    const { tale, onPress, ...restProps } = props;
    
    return (
        <Pressable onPress={() => onPress && onPress(tale.id!)}>
            <View {...restProps} className="border rounded-md m-2 p-4 bg-red-300">
                <Text className="font-semibold">{props.tale.title}</Text>
                <Text className="text-sm text-gray-600">{props.tale.description}</Text>
            </View>
        </Pressable>
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

interface DetailedTaleProps {
    tale: ITale;
}

export const DetailedTale = (props: DetailedTaleProps) => {
    const [tale, setTale] = React.useState<ITale>(props.tale);

    return (
        <View>
            <Text>DetailedTale</Text>
        </View>
    );
};
