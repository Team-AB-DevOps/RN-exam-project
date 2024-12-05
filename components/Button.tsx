import { TouchableOpacity, View, ViewProps } from "react-native";
import React from "react";
import { useStyling } from "../contexts/StyleContext";

interface CircleIconButtonProps extends ViewProps {
    children: React.ReactNode;
    onPress: () => void;
}

export const CircleIconButton = (props: CircleIconButtonProps) => {
    const { theme } = useStyling();

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                {...props}
                style={{
                    // backgroundColor: theme.tabBackground,
                    shadowColor: "#000",
                    shadowOpacity: 0.25,
                    shadowRadius: 1,
                    elevation: 3,
                }}
                className="flex mx-5 my-1.5 justify-center items-center size-20 rounded-full bg-slate-200 active:bg-slate-300 active:scale-110 transition duration-100"
            >
                {props.children}
            </View>
        </TouchableOpacity>
    );
};
