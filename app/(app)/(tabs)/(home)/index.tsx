import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

export default function HomePage() {
    // Dine usestates for elementet
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gestureHandler = Gesture.Pan()
        .onStart((context) => {
            context.translationX = translateX.value;
            context.translationY = translateY.value;
        })
        .onChange((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        });

    const animateStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
        };
    });

    return (
        <View className="flex flex-1 justify-center items-center">
            <GestureDetector gesture={gestureHandler}>
                <Animated.View style={animateStyle}>
                    <Text className="text-green-500 text-center">Home page!</Text>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}


