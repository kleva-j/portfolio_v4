"use client";

import { useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

import {
  type HTMLMotionProps,
  useScroll,
  useSpring,
  motion,
} from "motion/react";

type ScrollProgressProps = React.ComponentProps<"div"> & {
  progressProps?: HTMLMotionProps<"div">;
};

function ScrollProgress({
  ref,
  className,
  children,
  progressProps,
  ...props
}: ScrollProgressProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const { scrollYProgress } = useScroll(
    children ? { container: containerRef } : undefined
  );

  const springConfig = { stiffness: 250, damping: 40, bounce: 0 };
  const scaleX = useSpring(scrollYProgress, springConfig);

  return (
    <>
      <motion.div
        data-slot="scroll-progress"
        {...progressProps}
        style={{ scaleX }}
        className={cn(
          "fixed z-50 top-0 inset-x-0 h-0.5 bg-blue-500 origin-left",
          progressProps?.className
        )}
      />
      {containerRef.current && (
        <div
          ref={containerRef}
          data-slot="scroll-progress-container"
          className={cn("overflow-y-auto h-full", className)}
          {...props}
        >
          {children}
        </div>
      )}
    </>
  );
}

export { ScrollProgress, type ScrollProgressProps };
