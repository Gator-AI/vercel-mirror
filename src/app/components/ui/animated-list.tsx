"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  listHovering: boolean;
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 500, listHovering }: AnimatedListProps) => {
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );
    const maxIndex = childrenArray.length - 1;
    const [index, setIndex] = useState(() => (listHovering ? maxIndex : 0));

    // When listHovering becomes true, show all items immediately
    useEffect(() => {
      if (listHovering) {
        setIndex(maxIndex);
      }
    }, [listHovering, maxIndex]);

    // When not hovering, reveal items one by one (optional staggered behavior)
    useEffect(() => {
      if (!listHovering && index < maxIndex) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [listHovering, index, delay, maxIndex]);

    const itemsToShow = useMemo(() => {
      const end = Math.min(index + 1, childrenArray.length);
      return childrenArray.slice(0, end).reverse();
    }, [index, childrenArray]);

    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}
