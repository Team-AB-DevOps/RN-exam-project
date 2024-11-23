import { Button, View } from "react-native";
import React from "react";
import ITale from "../../../../models/Tale";
import { DateInput, MyTextInput } from "../../../../components/Input";
import * as ImagePicker from "expo-image-picker";

const INIT_FORM: ITale = {
    title: "",
    description: "",
    date: new Date(),
    coordinate: { latitude: 0, longitude: 0 },
};

export default function CreateTalePage() {
    const [tale, setTale] = React.useState<ITale>(INIT_FORM);
    const [imagePath, setImagePath] = React.useState("");

    const handleSubmit = () => {
        //TODO: On Submit, bed om location rettigheder. Hvis fail, så 400.
        throw new Error("Function not implemented.");
    };

    const handleCamera = async () => {
        //TODO: Launch camera with location rights.
        const imagePermission = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (imagePermission.canceled) return;
    };

    const handleAlbum = async () => {
        //TODO: Launch album
    };

    return (
        <View className="flex-1">
            <View className="flex flex-row justify-evenly items-center h-32">
                <Button title="Select Image" onPress={handleAlbum} />
                <Button title="Take a new image" onPress={handleCamera} />
            </View>
            <MyTextInput label="Title" value={tale.title} onChangeText={(title) => setTale((prev) => ({ ...prev, title }))} />
            <MyTextInput label="Description" value={tale.description} onChangeText={(description) => setTale((prev) => ({ ...prev, description }))} />
            <View className="flex justify-center items-center">
                <DateInput value={tale.date} onChange={(date) => setTale((prev) => ({ ...prev, date }))} maximumDate={new Date()} label="Date" />
            </View>
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}
