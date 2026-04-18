import { useEffect, useRef, useState } from 'react';

export default function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(target);
  const startVal = useRef(target);
  const startTime = useRef(null);
  const frame = useRef(null);

  useEffect(() => {
    startVal.current = value;
    startTime.current = null;
    cancelAnimationFrame(frame.current);

    const step = (t) => {
      if (!startTime.current) startTime.current = t;
      const progress = Math.min(1, (t - startTime.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = startVal.current + (target - startVal.current) * eased;
      setValue(next);
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}
