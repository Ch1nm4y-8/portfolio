import { useEffect, useState } from "react";

export function useAsciiGlitch(
  ascii,
  {
    minInterval = 2500,
    maxInterval = 7000,
    duration = 80,

    minBandHeight = 2,
    maxBandHeight = 5,

    maxShift = 5,
  } = {}
) {
  const [display, setDisplay] = useState(ascii);

  useEffect(() => {
    let glitchTimer;
    let restoreTimer;

    const glitch = () => {
      const lines = ascii.split("\n");
      const out = [...lines];

      const start = Math.floor(Math.random() * lines.length);

      const height = Math.floor(Math.random() * (maxBandHeight - minBandHeight + 1)) + minBandHeight;

      let shift = Math.floor(Math.random() * (maxShift * 2 + 1)) - maxShift;

      // don't allow 0 shift
      if (shift === 0) shift = Math.random() > 0.5 ? 1 : -1;

      for (let i = start; i < Math.min(start + height, lines.length); i++) {
        if (shift > 0) {
          out[i] = " ".repeat(shift) + lines[i];
        } else {
          out[i] = lines[i].slice(-shift);
        }
      }

      setDisplay(out.join("\n"));

      restoreTimer = setTimeout(() => {
        setDisplay(ascii);
        schedule();
      }, duration);
    };

    const schedule = () => {
      const delay = minInterval + Math.random() * (maxInterval - minInterval);

      glitchTimer = setTimeout(glitch, delay);
    };

    setDisplay(ascii);
    schedule();

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(restoreTimer);
    };
  }, [ascii, minInterval, maxInterval, duration, minBandHeight, maxBandHeight, maxShift]);

  return display;
}
