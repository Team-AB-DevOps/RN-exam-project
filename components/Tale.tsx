import { View, Text, ViewProps, Pressable, Image } from "react-native";
import React from "react";
import ITale from "../models/Tale";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import { app, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

interface TaleDisplayProps extends ViewProps {
    tale: ITale;
    userId?: string | undefined;
    onSwipeRight?: (id: string) => void; // Delete
    onPress?: (id: string) => void;
}

export const TaleListItem = (props: TaleDisplayProps) => {
    const { tale, onPress, ...restProps } = props;

    return (
        <Pressable onPress={() => onPress && onPress(tale.id!)}>
            <View {...restProps} className="border rounded-md m-2 p-4 bg-red-300">
                <Text className="font-semibold">{props.tale.title}</Text>
                <Text className="text-sm text-gray-600">{props.tale.description}</Text>
            </View>
        </Pressable>
    );
};

export const TaleGridItem = (props: TaleDisplayProps) => {
    const [imagePath, setImagePath] = React.useState<string>("");
    const { tale, onPress, userId, ...restProps } = props;

    React.useEffect(() => {
        const fetchImage = async () => {
            const storageRef = ref(storage, `${userId}/${tale.id}/`);
            const url = await getDownloadURL(storageRef);
            setImagePath(url);
        };

        fetchImage();
    }, [tale.id, userId]);

    return (
        <Pressable {...restProps} className="border rounded-md p-2 w-[47%]" onPress={() => onPress && onPress(tale.id!)}>
            <Image className="w-full h-80" src={imagePath} />
            <Text className="font-semibold">{props.tale.title}</Text>
            <Text className="text-sm text-gray-600">{props.tale.description}</Text>
        </Pressable>
    );
};

interface DetailedTaleProps {
    tale: ITale;
}

export const DetailedTale = (props: DetailedTaleProps) => {
    const [tale, setTale] = React.useState<ITale>(props.tale);

    return (
        <View>
            <Text>DetailedTale</Text>
        </View>
    );
};
