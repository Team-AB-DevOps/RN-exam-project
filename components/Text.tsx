import { ReactNode } from "react";
import { TextProps, Text } from "react-native";

interface Props extends TextProps {
    children: ReactNode;
}

export const ScreenTitle = (props: Props) => {
    return (
        <Text {...props} className="text-3xl font-bold mb-3">
            {props.children}
        </Text>
    );
};
