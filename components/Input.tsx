import { Text, TextInput, TextInputProps, View, ViewProps } from "react-native";
import React from "react";
import { useStyling } from "../contexts/StyleContext";

const combineClass = (classOne: string, classTwo?: string) => {
    return classOne + " " + classTwo;
};

interface LabelProps {
    text: string;
}

export const Label = (props: LabelProps) => {
    return <Text className="pt-3 text-center">{props.text}</Text>;
};

interface CustomTextInputProps extends TextInputProps {
    label?: string;
}

export const MyTextInput = (props: CustomTextInputProps) => {
    const { theme } = useStyling();

    const changeInput = (value: string) => {
        props.onChangeText?.(value);
    };

    return (
        <>
            {props.label && <Label text={props.label} />}
            <TextInput
                {...props}
                style={{ color: theme.textStyle, backgroundColor: theme.tabBackground }}
                className={combineClass("border p-3 m-3", props.className)}
                onChangeText={changeInput}
            />
        </>
    );
};

interface CircleIconProps extends ViewProps {
    children: React.ReactNode;
    onPress: () => void;
}

export const CircleIcon = (props: CircleIconProps) => {
    const { theme } = useStyling();

    return (
        <View
            {...props}
            onTouchEnd={props.onPress}
            style={{ backgroundColor: theme.tabBackground }}
            className="flex mx-5 my-3 justify-center items-center w-20 h-20 border rounded-full"
        >
            {props.children}
        </View>
    );
};
