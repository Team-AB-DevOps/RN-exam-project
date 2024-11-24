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

                className={combineClass("border p-3 m-3 w-56 rounded-md", props.className)}

                onChangeText={changeInput}
            />
        </>
    );
};


