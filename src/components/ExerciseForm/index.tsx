import * as React from "react";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import { PressableText } from "../PressableText";

import { useForm, Controller } from "react-hook-form";

export type ExerciseFormData = {
  name: string;
  duration: string;
  type: string;
  reps?: string;
};

type WorkoutProps = {
  onSubmit: (form: ExerciseFormData) => void;
};

const selectionItems = ["exercise", "break", "stretch"];

export default function ExerciseForm({ onSubmit }: WorkoutProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSelectionOn, setSelectionOn] = React.useState(false);
  const colorSchema = useColorScheme();

  return (
    <View
      style={styles.container}
    >
      <Text>Exercise Form</Text>

      <View>
        <View style={styles.rowContainer}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder="Name"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                style={styles.input}
              />
            )}
          />
          {/* 
          {errors.name && (
            <Text style={{ color: "#FF0000", marginTop: 6, marginBottom: 5, textAlign: 'center' }}>
              *
            </Text>
          )} */}

          <Controller
            name="duration"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Duration"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View style={styles.rowContainer}>
          <Controller
            name="reps"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Repetitions"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <View style={{ flex: 1 }}>
                {isSelectionOn ? (
                  <View>
                    {selectionItems.map((selection, idx) => (
                      <PressableText
                        style={styles.selection}
                        key={idx}
                        text={selection}
                        onPressIn={() => {
                          onChange(selection);
                          setSelectionOn(false);
                        }}
                      />
                    ))}
                  </View>
                ) : (
                  <TextInput
                    onPressIn={() => setSelectionOn(true)}
                    style={styles.input}
                      placeholder="Type"
                      placeholderTextColor={"rgba(0,0,0,0.4)"}
                    value={value}
                  />
                )}
              </View>
            )}
          />
        </View>

        <PressableText
          style={{ marginTop: 10 }}
          text="Add Exercise"
          onPress={handleSubmit((form) => onSubmit(form as ExerciseFormData))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF'
  },
  input: {
    flex: 1,
    height: 40,
    margin: 2,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: "rgba(0,0,0, 0.4)",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
  },
  selection: {
    margin: 2,
    padding: 3,
    alignSelf: "center",
  },
});
