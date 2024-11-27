import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import IRegion from "../../../../models/Region";
import * as Location from "expo-location";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { database, storage } from "../../../../firebase";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Image as ImageSvg, Svg } from "react-native-svg";
import { useColorScheme } from "nativewind";
import { useAuth } from "../../../../contexts/AuthContext";
import ITale from "../../../../models/Tale";

export default function MapPage() {
    const [imagePath, setImagePath] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [region, setRegion] = React.useState<IRegion | undefined>(undefined);
    const { user } = useAuth();
    const [values, load, error] = useCollection(collection(database, `${user?.uid!}`));
    const markers = values?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ITale[];
    const mapRef = React.useRef<MapView>(null!);
    const color = useColorScheme().colorScheme;

    React.useEffect(() => {
        // Sætter din start region til din lokation.
        const getUserLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                alert("Permission for user location not provided");
                return;
            }

            Location.getCurrentPositionAsync().then(({ coords }) => {
                setRegion({ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.7, longitudeDelta: 0.7 });
            });
        };
        // Fetcher billeder tilknyttet markers
        const fetchImageUrls = async () => {
            try {
                const storageRef = ref(storage, `${user?.uid!}/`);
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
        setLoading(false);
    }, [user?.uid]);

    const handleMapReady = React.useCallback(() => {
        setTimeout(() => {
            mapRef.current.animateToRegion(region!, 500);
        }, 1000);
    }, [region]);

    if (loading || load) {
        return <ActivityIndicator className="flex-1" />;
    }


    return (
        <View className="flex-1">
            <MapView
                ref={mapRef}
                onMapReady={handleMapReady}
                mapType="hybrid"
                loadingEnabled
                showsMyLocationButton
                userInterfaceStyle={color}
                showsUserLocation
                className="w-full h-full"
            >
                {markers?.map((marker) => (
                    <Marker coordinate={{ ...marker.coordinate }} key={marker.id}>
                        <Callout>
                            <View className="h-28 w-28">
                                <Svg width={"100%"} height={"100%"}>
                                    <ImageSvg
                                        width={"100%"}
                                        height={"100%"}
                                        preserveAspectRatio="xMidYMid slice"
                                        href={{ uri: imagePath.find((url) => url.includes(marker.id!)) }}
                                    />
                                </Svg>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}
