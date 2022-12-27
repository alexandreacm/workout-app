import React from "react";
import { Text, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
};

export function Label({ children }: Props) {
  return <Text style={styles.header}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    fontFamily: "montserrat-bold",
  },
});
