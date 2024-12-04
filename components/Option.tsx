import { Text, View } from "react-native";
import { useStyling } from "../contexts/StyleContext";

interface OptionProps extends React.PropsWithChildren {
    lable: string;
}

export const Option = (props: OptionProps) => {
    const {theme} = useStyling();

    return (
        <View style={{ backgroundColor: theme.tabBackground }} className="flex flex-row items-center justify-between m-2 px-3 py-2 rounded-xl bg-gray-200">
            <Text className="text-lg">{props.lable}</Text>
            {props.children}
        </View>
    );
};
