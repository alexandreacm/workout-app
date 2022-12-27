import React from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { WorkOut } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";

import useWorkouts from "../hooks/useWorkouts";
import { ThemeText } from "../components/ThemeText";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
  const workouts = useWorkouts();

  function renderItem({ item }: { item: WorkOut }) {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("WorkoutDetail", { slug: item.slug })
        }
      >
        <WorkoutItem data={item} />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      {/* <MontserratText style={styles.header}>New Workouts</MontserratText> */}
      <ThemeText style={styles.header}>New Workouts</ThemeText>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
