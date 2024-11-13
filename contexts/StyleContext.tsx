import React from "react";
import { useColorScheme } from "nativewind";
type TStyle = { backgroundColor: string; textStyle?: string; restaurantCardStyle?: string; tabBackground?: string };

type StyleContextType = {
    theme: TStyle;
};

const StyleContext = React.createContext<StyleContextType>(null!);

export default function StyleProvider(props: { children: React.ReactNode }) {
    const { colorScheme } = useColorScheme();

    const lightTheme: TStyle = {
        backgroundColor: "bg-slate-100",
        tabBackground: "#E2E8F0",
    };

    const darkTheme: TStyle = {
        backgroundColor: "bg-slate-800",
        textStyle: "text-slate-300",
        restaurantCardStyle: "bg-slate-700",
        tabBackground: "#334155",
    };

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    console.log(colorScheme);

    return <StyleContext.Provider value={{ theme }}>{props.children}</StyleContext.Provider>;
}

export function useStyling() {
    return React.useContext(StyleContext);
}
