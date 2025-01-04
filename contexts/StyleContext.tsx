import React from "react";
import { useColorScheme } from "nativewind";

type TStyle = {
    backgroundColor: string;
    textStyle?: string;
    restaurantCardStyle?: string;
    tabBackground?: string;
    tabIconStyle?: string;
    tabIconStyleActive?: string;
};

type StyleContextType = {
    theme: TStyle;
};

const StyleContext = React.createContext<StyleContextType>(null!);

export default function StyleProvider(props: { children: React.ReactNode }) {
    const { colorScheme } = useColorScheme();

    const lightTheme: TStyle = {
        backgroundColor: "bg-slate-100",
        textStyle: "#000000",
        tabBackground: "#E2E8F0",
        tabIconStyle: "#636362",
        tabIconStyleActive: "#e3b600",
    };

    const darkTheme: TStyle = {
        backgroundColor: "bg-slate-800",
        textStyle: "#FFFFFF",
        tabBackground: "#334155",
        tabIconStyle: "#c4c4c4",
        tabIconStyleActive: "#fde68a",
    };

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    console.log(colorScheme);

    return <StyleContext.Provider value={{ theme }}>{props.children}</StyleContext.Provider>;
}

export function useStyling() {
    return React.useContext(StyleContext);
}
