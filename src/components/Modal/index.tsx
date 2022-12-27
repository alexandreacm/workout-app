import React, { FunctionComponent } from "react";

import { View, StyleSheet, Modal as DefaultModal } from "react-native";
import { PressableText } from "../PressableText";
import { FontAwesome as Icon } from "@expo/vector-icons";

type ModalProps = {
  activator?: FunctionComponent<{
    handleOpen: () => void;
  }>;
  children: FunctionComponent<{
    handleClose: () => void
    handleOpen: () => void;
  }>;
};

export function Modal({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  return (
    <>
      <DefaultModal visible={isModalVisible} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.contentView}>{children({ handleClose, handleOpen })}</View>
          <Icon
            name="window-close"
            size={30}
            onPress={handleClose}
            text="Close"
          />
        </View>
      </DefaultModal>
      {Activator ? (
        <Activator handleOpen={handleOpen} />
      ) : (
        <PressableText onPress={handleOpen} text="Open Modal" />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginBottom: 20,
  },
});
