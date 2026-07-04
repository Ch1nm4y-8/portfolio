import { useState, useEffect } from "react";

export function useAsciiCycle(arts, interval = 1000) {
  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    console.log("helllloooooooooooooo");
    if (arts.length < 2) return;

    const tick = setInterval(() => {
      console.log("tick");
      // 1. start glitch animation
      setGlitching(true);

      // 2. mid-glitch: swap the art so it changes while the screen is "broken"
      setTimeout(() => {
        console.log("inside");
        setIndex((prev) => {
          // pick a random index that isn't the current one
          let next;
          do {
            next = Math.floor(Math.random() * arts.length);
          } while (next === prev && arts.length > 1);
          return next;
        });
      }, 200); // swap at halfway through the 400ms glitch

      // 3. stop glitch
      setTimeout(() => setGlitching(false), 400);
    }, interval);

    return () => clearInterval(tick);
  }, [arts, interval]);

  return { ascii: arts[index], glitching };
}
