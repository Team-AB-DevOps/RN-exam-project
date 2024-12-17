import { View, Text, ViewProps, Pressable, ImageBackground } from "react-native";
import React from "react";
import ITale from "../models/Tale";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useFocusEffect } from "expo-router";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

interface TaleDisplayProps extends ViewProps {
    tale: ITale;
    onSwipeLeft?: (id: string) => void; // Navigate
    userId?: string | undefined;
    onPress?: (id: string) => void;
}

export const TaleListItem = (props: TaleDisplayProps) => {
    const { tale, onPress, onSwipeLeft, ...restProps } = props;

    const translateX = useSharedValue(0);

    useFocusEffect(
        React.useCallback(() => {
            // Reset animations when the screen is focused
            translateX.value = withSpring(0, {
                duration: 1000,
                dampingRatio: 1.0,
            });
        }, [translateX]),
    );

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            "worklet";
            if (event.translationX > 0) {
                translateX.value = event.translationX;
            }
        })
        .onEnd(() => {
            "worklet";
            if (translateX.value > 200) {
                translateX.value = withSpring(500); // Slides out of view
                if (onSwipeLeft) {
                    runOnJS(onSwipeLeft)(tale.id!);
                }
            } else {
                translateX.value = withSpring(0, {
                    duration: 1000,
                    dampingRatio: 1.0,
                });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const shortDescription = tale.description.length > 50 ? tale.description.slice(0, 50) + "..." : tale.description;

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View {...restProps} style={animatedStyle} className="border rounded-md m-2 p-4 bg-amber-200 shadow">
                <Text className="font-semibold text-2xl">{tale.title}</Text>
                <Text className="text-sm text-gray-600">{shortDescription}</Text>
            </Animated.View>
        </GestureDetector>
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
        <Pressable {...restProps} className="w-[47%] bg-slate-200 rounded-2xl overflow-hidden shadow" onPress={() => onPress && onPress(tale.id!)}>
            <ImageBackground className="flex justify-end w-full h-80 rounded-md" src={imagePath}>
                <View className="bg-amber-200 h-14 p-2">
                    <Text className="font-semibold text-2xl text-center">{props.tale.title}</Text>
                </View>
            </ImageBackground>
        </Pressable>
    );
};
