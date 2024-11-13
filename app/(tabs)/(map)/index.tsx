import React from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Callout, LongPressEvent, Marker } from "react-native-maps";
import IRegion from "../../../models/Region";
import IMarker from "../../../models/Marker";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Image as ImageSvg, Svg } from "react-native-svg";

export default function MapPage() {
    const [imagePath, setImagePath] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [region, setRegion] = React.useState<IRegion | undefined>(undefined);
    const [values, error] = useCollection(collection(database, "markers"));
    const markers = values?.docs.map((doc) => ({ ...doc.data() })) as IMarker[];

    React.useEffect(() => {
        // Sætter din start region til din lokation.
        const getUserLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                alert("Permission for user location not provided");
                return;
            }

            Location.getCurrentPositionAsync().then(({ coords }) => {
                setRegion({ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.3, longitudeDelta: 0.3 });
                setLoading(false);
            });
        };
        // Fetcher billeder tilknyttet markers
        const fetchImageUrls = async () => {
            try {
                const storageRef = ref(storage, `map_images/`);
                const result = await listAll(storageRef);
                const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
                const urls = await Promise.all(urlPromises);
                setImagePath(urls);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        getUserLocation();
        fetchImageUrls();
    }, []);

    const uploadMarker = async (newMarker: IMarker) => {
        const { id } = await addDoc(collection(database, "markers"), newMarker);
        return id;
    };

    const uploadImage = async (URI: string, id: number) => {
        const res = await fetch(URI);
        const blob = await res.blob();
        const imageRef = ref(storage, `map_images/image_${id}`);

        await uploadBytes(imageRef, blob);

        // Returnerer URI for billedet i clouden
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
    };

    const handleLongPress = async (e: LongPressEvent) => {
        e.persist();
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (result.canceled) {
            return;
        }

        const URI = result.assets[0].uri;

        const { latitude, longitude } = e.nativeEvent.coordinate;
        const newMarker: IMarker = {
            coordinate: { latitude, longitude },
            key: e.timeStamp,
        };

        await uploadMarker(newMarker);
        const downloadURL = await uploadImage(URI, newMarker.key);
        setImagePath((prev) => [...prev, downloadURL]);
    };

    // Bemærk attribute 'showsUserLocation'!
    return (
        <View className="flex-1">
            {loading ? (
                <ActivityIndicator className="flex-1" size="large" />
            ) : (
                <MapView region={region} showsUserLocation onLongPress={handleLongPress} className="w-full h-full">
                    {markers?.map((marker) => (
                        <Marker coordinate={{ ...marker.coordinate }} key={marker.key}>
                            <Callout>
                                <View className="h-28 w-28">
                                    <Svg width={"100%"} height={"100%"}>
                                        <ImageSvg
                                            width={"100%"}
                                            height={"100%"}
                                            preserveAspectRatio="xMidYMid slice"
                                            href={{ uri: imagePath.find((i) => i.includes(String(marker.key))) }}
                                        />
                                    </Svg>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            )}
        </View>
    );
}
