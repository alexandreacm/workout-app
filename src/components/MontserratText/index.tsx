import React from "react";
import { Text } from "react-native";

// type Props = {
//   children: React.ReactNode;
// };

// MontserratText({ children }: { children: React.ReactNode }) {
// MontserratText(props: Text["props"]) {

export function MontserratText(props: Text["props"]) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "montserrat-bold" }]} />
  );
}
