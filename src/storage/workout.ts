import {
  getData,
  setData,
  containsKey,
  removeItem,
  removeAllWorkouts,
} from ".";
import { WorkOut } from "../types/data";
import { workout_key } from "../constants";

import data from "../../data.json";

export async function initWorkouts(): Promise<boolean> {
  const hasWorkouts = await containsKey(workout_key);

  if (!hasWorkouts) {
    await setData(workout_key, data);

    return true;
  }

  return false;
}

export const getWorkouts = async (): Promise<WorkOut[]> => {
  return await getData(workout_key);
};

export const getWorkoutBySlug = async (slug: string): Promise<WorkOut> => {
  const workouts = await getWorkouts();
  const workout = workouts.filter((w) => w.slug === slug)[0];

  return workout;
};

export const clearWorkouts = async () => {
  await removeItem(workout_key);
};

export const clearAllWorkouts = async () => {
  await removeAllWorkouts();
};

export const storeWorkout = async (newWorkout: WorkOut): Promise<boolean> => {
  const workouts = await getWorkouts();
  await setData(workout_key, [newWorkout, ...workouts]);
  return true;
}