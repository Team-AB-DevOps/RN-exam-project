import { Text, View } from "react-native";
import { useStyling } from "../contexts/StyleContext";

interface OptionProps extends React.PropsWithChildren {
    lable: string;
}

export const Option = (props: OptionProps) => {
    const {theme} = useStyling();

    return (
        <View className="flex flex-row items-center justify-between m-2 px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-600">
            <Text className="text-lg">{props.lable}</Text>
            {props.children}
        </View>
    );
};
