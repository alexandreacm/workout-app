import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getWorkouts } from "../storage/workout";
import { WorkOut } from "../types/data";

export default function useWorkouts() {
  const [workouts, setWorkOuts] = useState<WorkOut[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getData() {
      const _workouts = await getWorkouts();
      setWorkOuts(_workouts);
    }

    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  return workouts;
}
