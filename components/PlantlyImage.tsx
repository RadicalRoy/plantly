import { Image, useWindowDimensions } from "react-native";

export function PlantlyImage() {
  const { width } = useWindowDimensions();

  // considering web screensize here as well
  const imageSize = Math.min(width / 1.5, 400);

  // require source file to ensure it is bundled
  return (
    <Image
      source={require("@/assets/plantly.png")}
      style={{ width: imageSize, height: imageSize }}
    />
  );
}
