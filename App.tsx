import { useColorScheme } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import { Navigation as Routes } from "./src/navigation";

export default function App() {
  const isLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  if (isLoaded) {
    return (
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Routes colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }

  return null;
}
