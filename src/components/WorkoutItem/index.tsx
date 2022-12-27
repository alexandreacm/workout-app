import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { WorkOut } from "../../types/data";

import { formatSec } from "../../utils/time";

// type WorkoutItemProps = {
//   data: WorkOut;
//   children: React.ReactNode;
// };

export default function WorkoutItem({
  data,
  children,
  childStyles = {},
}: {
  data: WorkOut;
  children?: React.ReactNode;
  childStyles?: StyleProp<ViewStyle>;
}) {
  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name: {data.name}</Text>
      <Text style={styles.duration}>Duration: {formatSec(data.duration)}</Text>
      <Text style={styles.difficulty}>Difficulty: {data.difficulty}</Text>

      {children && <View style={childStyles}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  duration: {
    fontSize: 15,
  },
  difficulty: {
    fontSize: 15,
  },
});
