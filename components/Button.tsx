import { View, ViewProps } from "react-native";
import React from "react";
import { useStyling } from "../contexts/StyleContext";

interface CircleIconButtonProps extends ViewProps {
    children: React.ReactNode;
    onPress: () => void;
}

export const CircleIconButton = (props: CircleIconButtonProps) => {
    const { theme } = useStyling();

    return (
        <View
            {...props}
            onTouchEnd={props.onPress}
            style={{ backgroundColor: theme.tabBackground }}
            className="flex mx-5 my-1.5 justify-center items-center w-20 h-20 border rounded-full"
        >
            {props.children}
        </View>
    );
};
