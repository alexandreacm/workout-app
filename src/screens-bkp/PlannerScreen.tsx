import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Text>I am in PlannerScreen </Text>
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go Back-1" onPress={() => goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
