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
            className="flex mx-5 my-1.5 justify-center items-center w-14 h-14 border rounded-full"
        >
            {props.children}
        </View>
    );
};
