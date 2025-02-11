import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "@/theme";
import { PlantlyImage } from "@/components/PlantlyImage";
import { useState } from "react";
import { PlantlyButton } from "@/components/PlantlyButton";

export default function NewScreen() {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");

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

    console.log("Adding plant", name, frequency);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centered}>
        <PlantlyImage />
      </View>

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
    </ScrollView>
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
  centered: { alignItems: "center" },
});
