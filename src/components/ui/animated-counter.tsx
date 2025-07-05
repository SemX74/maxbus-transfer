import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({
  value,
  duration = 2,
  className,
}: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration });
      return controls.stop;
    }
  }, [count, value, duration, isInView]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
};

export default AnimatedCounter;
