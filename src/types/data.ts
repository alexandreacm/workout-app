type Difficulty = "easy" | "medium" | "hard" | "normal";
export type SequenceType = "exercise" | "break" | "stretch";

export interface WorkOut {
  slug: string;
  name: string;
  duration: number;
  difficulty: Difficulty;
  sequence: Array<SequenceItem>;
}

export interface SequenceItem {
  slug: string;
  name: string;
  type: SequenceType;
  reps?: number;
  duration: number;
}
