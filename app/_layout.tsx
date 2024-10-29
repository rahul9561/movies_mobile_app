import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Search" options={{ headerShown: false }} />
      <Stack.Screen name="ViewsMovies" options={{ headerShown: false }} />
      <Stack.Screen name="SeeAll" options={{ headerShown: false }} />
    </Stack>
  );
}
