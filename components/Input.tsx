import { Text, TextInput, TextInputProps } from "react-native";
import React from "react";
import { useStyling } from "../contexts/StyleContext";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

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

interface DateInputProps {
    value: Date;
    onChange: (date: Date) => void;
    maximumDate?: Date;
    label?: string;
    textColor?: string;
}

export const DateInput = (props: DateInputProps) => {
    const { label, onChange, textColor, ...restProps } = props;

    const toUtcMidnight = (date: Date) => new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    const handleChange = (event: DateTimePickerEvent, date?: Date) => {
        if (event.type === "dismissed" || !date) return;

        onChange(toUtcMidnight(date));
    };

    return (
        <>
            {label && <Label text={label} />}
            <RNDateTimePicker
                {...restProps}
                textColor={textColor ?? "black"}
                onChange={handleChange}
                value={props.value}
                display="spinner"
                minimumDate={new Date(1900, 0)}
            />
        </>
    );
};
