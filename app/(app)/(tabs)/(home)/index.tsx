import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { ScrollView, Text, View } from "react-native";
import { database } from "../../../../firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import ITale from "../../../../models/Tale";
import { useFocusEffect, useRouter } from "expo-router";
import { TaleGridItem, TaleListItem } from "../../../../components/Tale";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import { CircleIconButton } from "../../../../components/Button";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [display, setDisplay] = React.useState<"list" | "grid">("grid");
    const [values, loading, error] = useCollection(collection(database, `${user!.uid}`));
    const [tales, setTales] = React.useState<null | ITale[]>(null);

    useFocusEffect(
        useCallback(() => {
            const tales = values?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ITale[];
            setTales(tales);
        }, [values]),
    );

    const handleDelete = (id: string) => {
        //TODO: Delete tale by id.
    };

    const handleNavigate = (id: string) => {
        router.push({
            pathname: "/[tale]",
            params: { id },
        });
    };

    const handleChangeDisplay = () => {
        const displayMode = display === "grid" ? "list" : "grid";
        
        setDisplay(displayMode);
    };

    const handleCreate = () => {
        router.push("create");
    };

    const displayIcon = display === "list" ? "th-list" : "th-large";

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1 dark:bg-gray-800">
                {!tales && <Text className="text-center font-bold text-lg mt-7">You don't have any tales, create your first one!</Text>}
                {display === "list" ? (
                    <ScrollView className="flex-1">
                        {tales?.map((tale) => <TaleListItem key={tale.id} tale={tale} onSwipeLeft={handleNavigate} onPress={() => handleNavigate(tale.id!)} />)}
                    </ScrollView>
                ) : (
                    <FlatList
                        columnWrapperStyle={{
                            justifyContent: "space-evenly",
                            marginTop: "2%",
                        }}
                        data={tales}
                        numColumns={2}
                        renderItem={({ item }) => <TaleGridItem key={item.id} tale={item} userId={user?.uid} onPress={() => handleNavigate(item.id!)} />}
                        keyExtractor={(item) => item.id!}
                    />
                )}
                <View className="absolute bottom-3 right-0">
                    <CircleIconButton onPress={handleChangeDisplay}>
                        <FontAwesome size={30} name={displayIcon} />
                    </CircleIconButton>
                    <CircleIconButton onPress={handleCreate}>
                        <FontAwesome size={30} name="plus" />
                    </CircleIconButton>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}
