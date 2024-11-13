import { Switch, SwitchProps } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";

interface Props extends SwitchProps {}

export const DarkModeSwitch = (props: Props) => {
    // Du skal stadig style med dark: i className
    const [isEnabled, setIsEnabled] = React.useState(false);
    const { toggleColorScheme } = useColorScheme();

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        toggleColorScheme();
    };

    return (
        <Switch
            {...props}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#14130d" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    );
};
