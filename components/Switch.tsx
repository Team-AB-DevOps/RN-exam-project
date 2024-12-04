import { Switch, SwitchProps } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";

interface Props extends SwitchProps {}

export const DarkModeSwitch = (props: Props) => {
    // Du skal stadig style med dark: i className
    const { toggleColorScheme, colorScheme } = useColorScheme();
    const [isEnabled, setIsEnabled] = React.useState(colorScheme === "dark");

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        toggleColorScheme();
    };

    return (
        <Switch
            {...props}
            thumbColor="white"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    );
};
