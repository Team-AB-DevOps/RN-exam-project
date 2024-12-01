import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { ScrollView, View } from "react-native";
import { database } from "../../../../firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import ITale from "../../../../models/Tale";
import { useRouter } from "expo-router";
import { TaleGridItem, TaleListItem } from "../../../../components/Tale";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { CircleIconButton } from "../../../../components/Button";

const talestest: ITale[] = [
    {
        id: "1",
        title: "The Enchanted Forest",
        description: "A magical forest where trees whisper secrets to those who listen.",
        date: new Date("2024-01-15"),
        coordinate: { latitude: 48.8566, longitude: 2.3522 },
    },
    {
        id: "2",
        title: "The Lost City of Aurum",
        description: "An ancient golden city hidden in the heart of the desert.",
        date: new Date("2023-11-10"),
        coordinate: { latitude: 25.276987, longitude: 55.296249 },
    },
    {
        id: "3",
        title: "The Singing Caves",
        description: "Caves that hum a haunting melody when the wind blows.",
        date: new Date("2023-12-01"),
        coordinate: { latitude: 37.7749, longitude: -122.4194 },
    },
    {
        id: "4",
        title: "The Lighthouse Keeper's Secret",
        description: "A lighthouse that shines only during the darkest storms, hiding a great mystery.",
        date: new Date("2024-03-20"),
        coordinate: { latitude: 51.5074, longitude: -0.1278 },
    },
    {
        id: "5",
        title: "The Clockwork Menagerie",
        description: "A collection of mechanical animals brought to life by a forgotten inventor.",
        date: new Date("2024-02-14"),
        coordinate: { latitude: 34.0522, longitude: -118.2437 },
    },
    {
        id: "6",
        title: "The River of Memories",
        description: "A mystical river that lets travelers relive their most cherished moments.",
        date: new Date("2024-04-10"),
        coordinate: { latitude: 40.7128, longitude: -74.006 },
    },
    {
        id: "7",
        title: "The Crimson Moon",
        description: "A tale of a village cursed to live under an eternal red moon.",
        date: new Date("2023-10-31"),
        coordinate: { latitude: 35.6895, longitude: 139.6917 },
    },
    {
        id: "8",
        title: "The Forgotten Library",
        description: "A library containing books that document the future, hidden in a dense jungle.",
        date: new Date("2023-12-20"),
        coordinate: { latitude: -1.2921, longitude: 36.8219 },
    },
    {
        id: "9",
        title: "The Shadow Bazaar",
        description: "A mysterious market that appears only under the light of a crescent moon.",
        date: new Date("2024-05-05"),
        coordinate: { latitude: 41.0082, longitude: 28.9784 },
    },
    {
        id: "10",
        title: "The Crystal Spire",
        description: "A shimmering tower that holds the key to an ancient prophecy.",
        date: new Date("2024-06-15"),
        coordinate: { latitude: -33.8688, longitude: 151.2093 },
    },
    {
        id: "11",
        title: "Test Test Test",
        description: "SHEIKMNIK.",
        date: new Date("2024-06-15"),
        coordinate: { latitude: -33.8688, longitude: 151.2093 },
    },
];

export default function HomePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [display, setDisplay] = React.useState<"list" | "grid">("grid");
    const [values, loading, error] = useCollection(collection(database, `${user!.uid}`));
    const tales = values?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ITale[];

    const handleDelete = (id: string) => {
        //TODO: Delete tale by id.
    };

    const handleNavigate = (id: string) => {
        //TODO: navigate to detailed page by id using router.
    };

    const handleChangeDisplay = () => {
        setDisplay((prev) => {
            if (prev === "list") return "grid";
            return "list";
        });
    };

    const handleCreate = () => {
        router.push("create");
    };

    const displayIcon = display === "list" ? "th-list" : "th-large";

    return (
        <View className="flex-1">
            {display === "list" ? (
                <ScrollView className="flex-1">
                    {tales?.map((tale) => <TaleListItem key={tale.id} tale={tale} onSwipeRight={handleDelete} onPress={handleNavigate} />)}
                </ScrollView>
            ) : (
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: "space-evenly",
                        marginTop: "2%",
                    }}
                    data={tales}
                    numColumns={2}
                    renderItem={({ item }) => <TaleGridItem key={item.id} tale={item} />}
                    keyExtractor={(item) => item.id!}
                />
            )}

            <View className="absolute bottom-3 right-0">
                <CircleIconButton onPress={handleChangeDisplay}>
                    <FontAwesome size={20} name={displayIcon} />
                </CircleIconButton>
                <CircleIconButton onPress={handleCreate}>
                    <FontAwesome size={20} name="plus" />
                </CircleIconButton>
            </View>
        </View>
    );
}
