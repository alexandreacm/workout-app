import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useWorkoutBySlug } from "../../hooks/useWorkoutBySlug";
import { PressableText } from "../../components/PressableText";
import { Modal } from "../../components/Modal";
import { formatSec } from "../../utils/time";

import { FontAwesome as Icon } from "@expo/vector-icons";
import WorkoutItem from "../../components/WorkoutItem";
import { SequenceItem, WorkOut } from "../../types/data";
import useCountDown from "../../hooks/useCountDown";

type DetailParams = {
  route: {
    params: {
      slug: string;
    };
  };
};

type Navigation = NativeStackHeaderProps & DetailParams;

export default function WorkoutDetail({ route }: Navigation) {
  const [sequence, setSequence] = useState<Array<SequenceItem>>([]);
  const [trackerIdx, setTrackerIdx] = useState(-1);

  const slug = route.params.slug;
  // const _slug = (route.params as any).slug;
  const workout = useWorkoutBySlug(slug);

  const { countDown, isRunning, stop, start } = useCountDown(trackerIdx);

  const startUpSeq = ["3", "2", "1", "Go"].reverse();

  // trackerIdx >= 0 ? sequence[trackerIdx].duration : -1
  useEffect(() => {
    if (!workout) return;
    if (trackerIdx == workout.sequence.length - 1) {
      return;
    }
    if (countDown === 0) {
      AddItemToSequence(trackerIdx + 1);
    }
  }, [countDown]);

  function AddItemToSequence(idx: number) {
    ////When I use this ! I'm sure that workout never will be undefined
    let newSequence = [];

    idx > 0
      ? (newSequence = [...sequence, workout!.sequence[idx]])
      : (newSequence = [workout!.sequence[idx]]);

    setSequence(newSequence);
    setTrackerIdx(idx);
    start(newSequence[idx].duration + startUpSeq.length);
  }

  const hasReachedEnd =
    sequence.length === workout?.sequence.length && countDown == 0;

  return (
    <View style={styles.container}>
      <WorkoutItem data={workout as WorkOut} childStyles={{ marginTop: 10 }}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText onPress={handleOpen} text={`Check Sequence`} />
          )}
        >
          {() => (
            <View>
              {workout?.sequence.map((si, idx) => (
                <View key={si.slug} style={styles.sequenceItem}>
                  <Text>
                    {si.name} | {si.type} | {formatSec(si.duration)}
                  </Text>
                  {idx !== workout.sequence.length - 1 && (
                    <Icon name="arrow-down" size={20} />
                  )}
                </View>
              ))}
            </View>
          )}
        </Modal>
      </WorkoutItem>

      <View style={styles.wrapper}>
        <View style={styles.counterUI}>
          <View style={styles.counterItem}>
            {sequence.length === 0 ? (
              <Icon
                name="play-circle-o"
                size={100}
                onPress={() => AddItemToSequence(0)}
              />
            ) : isRunning ? (
              <Icon
                name="stop-circle-o"
                size={100}
                onPress={() => {
                  stop();
                }}
              />
            ) : (
              <Icon
                name="play-circle-o"
                size={100}
                onPress={() => {
                  if (hasReachedEnd) {
                    console.log("RESTART COUNTDOWN");
                  } else {
                    start(countDown);
                  }
                }}
              />
            )}
          </View>
          {sequence.length > 0 && countDown >= 0 && (
            <View style={styles.counterItem}>
              <Text style={{ fontSize: 55 }}>
                {countDown > sequence[trackerIdx].duration
                  ? startUpSeq[countDown - sequence[trackerIdx].duration - 1]
                  : countDown}
              </Text>
            </View>
          )}
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>
            {sequence.length == 0
              ? "Preparing"
              : hasReachedEnd
                ? "Good job"
                : sequence[trackerIdx].name}
          </Text>
        </View>
      </View>
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
  formatText: {
    width: "100%",
    fontFamily: "montserrat",
    marginBottom: 10,
    marginTop: 10,
  },
  sequenceItem: {
    alignItems: "center",
  },
  counterUI: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 45,
    fontWeight: "600",
  },
  countDown: {
    fontSize: 60,
    fontWeight: "300",
    textAlign: "center",
  },
  counterItem: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "#FFF",
    borderWidth: 1,
    padding: 10,
  },
});
