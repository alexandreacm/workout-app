import React, { useState } from "react";
import { View, StyleSheet, FlatList, useColorScheme } from "react-native";
import slugify from "slugify";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { SequenceItem, SequenceType, WorkOut } from "../../types/data";
import ExerciseItem from "../../components/ExerciseItem";
import { PressableText } from "../../components/PressableText";
import { Modal } from "../../components/Modal";

import ExerciseForm, { ExerciseFormData } from "../../components/ExerciseForm";
import WorkoutForm, { WorkoutFormData } from "../../components/WorkoutForm";
import { storeWorkout } from "../../storage/workout";
import { PressableThemeText } from "../../components/PressableThemeText";

type Navigation = NativeStackHeaderProps;

export default function Planner({ navigation, route }: Navigation) {
  const [seqItems, setSeqItems] = useState<Array<SequenceItem>>([]);
  const colorSchema = useColorScheme();

  function handleExerciseSubmit(form: ExerciseFormData) {
    //replace(/\s/g, '-')
    const sequenceItem_: SequenceItem = {
      slug: `${slugify(form.name + " " + Date.now(), { lower: true })}`,
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };

    if (form.reps) {
      sequenceItem_.reps = Number(String(form.reps));
    }

    setSeqItems([...seqItems, sequenceItem_]);
  }

  function handleDeleteSequence(idx: number) {
    const items = [...seqItems];
    items.splice(idx, 1);
    setSeqItems(items);
  }

  const computeDiff = (exercisesCount: number, workoutDuration: number) => {
    const intensity = workoutDuration / exercisesCount;

    if (intensity <= 60) {
      return "hard";
    } else if (intensity <= 100) {
      return "normal";
    } else {
      return "easy";
    }
  };

  async function handleWorkFormSubmit(form: WorkoutFormData) {
    let slug = `${slugify(form.name + " " + Date.now(), { lower: true })}`;

    if (seqItems.length) {
      const duration = seqItems.reduce((acc: number, item: SequenceItem) => {
        return acc + item.duration;
      }, 0);

      const workout: WorkOut = {
        slug,
        name: form.name,
        difficulty: computeDiff(seqItems.length, duration),
        duration,
        sequence: [...seqItems],
      };

      await storeWorkout(workout);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={seqItems}
        keyExtractor={(item) => item.slug}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="delete"
              onPress={() => handleDeleteSequence(index)}
            />
          </ExerciseItem>
        )}
      />

      <ExerciseForm onSubmit={handleExerciseSubmit} />

      <View style={styles.viewForm}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableThemeText text="Create Workout" onPress={handleOpen} />
          )}
        >
          {({ handleClose }) => (
            <WorkoutForm
              onSubmit={async (data) => {
                await handleWorkFormSubmit(data);
                handleClose();
                navigation.navigate('Home');
              }}
            />
          )}
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  viewForm: {
    padding: 10,
    borderRadius: 10,
  },
});
