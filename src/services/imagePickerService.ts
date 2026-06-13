import * as ImagePicker from "expo-image-picker";

export type PickedImage = {
  uri: string;
};

export async function pickScreenshotFromLibrary(): Promise<PickedImage | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Photo library permission is required to upload a screenshot.");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 1
  });

  if (result.canceled || result.assets.length === 0) {
    return null;
  }

  return { uri: result.assets[0].uri };
}
