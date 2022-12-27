import { useEffect, useState, useRef } from "react";

export default function useCountDown(idx: number, initialCount: number = -1) {
  const [countDown, setCountDown] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number>();

  useEffect(() => {
    //debugger;
    if (idx == -1) {
      return;
    }

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCountDown((count) => {
          return count - 1;
        });
      }, 1000);
    }

    return cleanup; //DESTROYED INTERVAL.
  }, [idx, isRunning]);

  useEffect(() => {
    setCountDown(initialCount);
  }, [initialCount]);

  useEffect(() => {
    //debugger;
    if (countDown === 0) {
      cleanup();
    }
  }, [countDown]);

  function cleanup() {
    //debugger;
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current); //DESTROYED INTERVAL.
      intervalRef.current = undefined;
      setIsRunning(false);
    }
  }

  return {
    countDown,
    isRunning,
    stop: cleanup,
    start: (count?: number) => {
      setCountDown(count ?? initialCount);
      setIsRunning(true);
    },
  };
}
