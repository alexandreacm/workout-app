import { useEffect, useState } from "react";
import { getWorkoutBySlug } from "../storage/workout";
import { WorkOut } from "../types/data";

export function useWorkoutBySlug(slug: string) {
  const [workout, setWorkOut] = useState<WorkOut>();
  useEffect(() => {
    async function getWorkoutData() {
      const workOut = await getWorkoutBySlug(slug);
      setWorkOut(workOut);
    }

    getWorkoutData();
  }, []);

  return workout;
}
