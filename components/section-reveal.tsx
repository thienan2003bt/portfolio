"use client";

import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function SectionReveal({ children }: { children: ReactNode }) {
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();
  return (
    <motion.div initial={false} animate={controls} viewport={{ once: true, amount: 0.1 }} onViewportEnter={() => {
      if (!reducedMotion) void controls.start({ y: [8, 0], opacity: [0.85, 1], transition: { duration: 0.3, ease: "easeOut" } });
    }}>
      {children}
    </motion.div>
  );
}
