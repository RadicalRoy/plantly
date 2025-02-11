import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { theme } from "@/theme";
import { PlantlyImage } from "@/components/PlantlyImage";
import { useState } from "react";
import { PlantlyButton } from "@/components/PlantlyButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { usePlantStore } from "@/store/plantsStore";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function NewScreen() {
  const [imgUri, setImgUri] = useState("");
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const addPlant = usePlantStore((state) => state.addPlant);
  const router = useRouter();

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert("Validation Error", " Give your plant a name");
    }

    if (!frequency) {
      return Alert.alert(
        "Validation Error",
        "How often do you want your plant to be watered?",
      );
    }

    if (Number.isNaN(Number(frequency))) {
      Alert.alert(
        "Validation Error",
        "Watering frequency should be a number of days",
      );
    }

    addPlant(name, Number(frequency), imgUri);
    router.navigate("/");

    // console.log("Adding plant", name, frequency);
  };

  const handleChooseImage = async () => {
    if (Platform.OS === "web") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log("result", JSON.stringify(result, null, " "));

    if (!result.canceled) {
      setImgUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.centered}
        onPress={handleChooseImage}
      >
        <PlantlyImage imageUri={imgUri} />
      </TouchableOpacity>

      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="E.g. Casper the Cactus"
            onChangeText={setName}
            value={name}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Watering Frequency (every x days)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="E.g. 6"
            onChangeText={setFrequency}
            value={frequency}
            keyboardType="number-pad"
          />
        </View>
        <PlantlyButton title="Add plant" onPress={handleSubmit} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: theme.colorLightGrey,
    padding: 12,
    marginBottom: 24,
    fontSize: 18,
  },
  formField: {},
  form: {},
  label: { fontSize: 18, marginBottom: 8 },
  centered: { alignItems: "center", marginBottom: 24 },
});
