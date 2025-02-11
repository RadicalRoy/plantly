import { Stack } from "expo-router";

/*
    "fade" animation makes more sense for onboarding
*/

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="onboarding"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
}
