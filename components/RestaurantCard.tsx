import { View, Text, ViewProps, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";
import IRestaurant from "../models/Restaurant";

interface Props extends ViewProps {
    restaurant: IRestaurant;
    onDelete: (id: string) => void;
    onPress?: (name: string) => void;
}

export const RestaurantCard = (props: Props) => {
    const translateX = useSharedValue(0);

    const gestureHandler = Gesture.Pan()
        .onStart((context) => {
            context.translationX = translateX.value;
        })
        .onChange((event) => {
            translateX.value = event.translationX;
        })
        .onEnd(async () => {
            // Hvis x-værdi er større end 125, så flyv til højre og kald props.onDelete()
            if (Math.abs(translateX.value) > 125) {
                translateX.value = withSpring(500);
                // Du skal bruge runOnJS til at kalde parent props.onDelete(). Props skrives i en parantes videsiden af
                runOnJS(props.onDelete)(props.restaurant.id); 
            } else {
                translateX.value = withSpring(0);
            }
        });

    const animateStyle = useAnimatedStyle(() => {
        // Udregner opacity ud fra x-værdi
        const opacity = 1 - Math.min(Math.abs(translateX.value) / 200, 1);

        return {
            transform: [{ translateX: translateX.value }],
            opacity: opacity
        };
    });

    return (
        <GestureDetector gesture={gestureHandler}>
            <Animated.View style={animateStyle}>
                <TouchableOpacity onPress={() => props.onPress?.(props.restaurant.name)}>
                    <View {...props} className="bg-red-400 p-4">
                        <Text>{props.restaurant.name}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </GestureDetector>
    );
};
