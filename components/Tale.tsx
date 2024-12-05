import { View, Text, ViewProps, Pressable } from "react-native";
import React from "react";
import ITale from "../models/Tale";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useFocusEffect } from "expo-router";

interface TaleDisplayProps extends ViewProps {
    tale: ITale;
    onSwipeLeft?: (id: string) => void; // Navigate
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
            if (event.translationX < 0) {
                translateX.value = event.translationX;
            }
        })
        .onEnd(() => {
            "worklet";
            if (translateX.value < -200) {
                translateX.value = withSpring(-500); // Slides out of view
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

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View {...restProps} style={animatedStyle} className="border rounded-md m-2 p-4 bg-red-300">
                <Text className="font-semibold">{props.tale.title}</Text>
                <Text className="text-sm text-gray-600">{props.tale.description}</Text>
            </Animated.View>
        </GestureDetector>
    );
};

export const TaleGridItem = (props: TaleDisplayProps) => {
    const { tale, onPress, ...restProps } = props;

    return (
        <Pressable {...restProps} className="border rounded-md p-2 w-[47%]" onPress={() => onPress && onPress(tale.id!)}>
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
