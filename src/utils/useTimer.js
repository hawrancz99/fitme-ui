import { useEffect, useState } from "react";

function useTimer(start, secs = 8) {
  const [count, setCount] = useState(secs);

  useEffect(() => {
    if (start) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);
      return () => clearInterval(secondsLeft);
    }
  }, [start]);

  return count;
}

export default useTimer;
