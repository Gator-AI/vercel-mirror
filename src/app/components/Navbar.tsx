"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import StarIcon from "@/images/icons/star-icon.png";
import { House, Info, CodeXml, CircleHelp } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;

      if (direction < 0) {
        setVisible(true); // Show on scroll up
      } else {
        setVisible(false); // Hide on scroll down
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-5 right-5 border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-3 py-2 items-center justify-center gap-2",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "flex items-center justify-center relative font-neighbor font-light dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 after:content-[''] after:h-4 after:w-[1px] after:bg-neutral-400 after:dark:bg-neutral-600 after:ml-2 after:block",
              idx === navItems.length - 1 && "after:hidden" // hide the last divider
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: (
        <span>
          <House size={20} />
        </span>
      ),
    },
    {
      name: "About",
      link: "/about",
      icon: (
        <span>
          <Info size={20} />
        </span>
      ),
    },
    {
      name: "Programs",
      link: "/programs",
      icon: (
        <span>
          <CodeXml size={20} />
        </span>
      ),
    },
    {
      name: "FAQs",
      link: "/faqs",
      icon: (
        <span>
          <CircleHelp size={20} />
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="w-full flex items-center py-6">
        <div className="flex justify-center items-center gap-1 mx-4">
          <Image src={StarIcon} alt="Star Icon" width={25} height={25} />
          <p className="text-2xl font-neighbor font-normal">GatorAI</p>
        </div>
      </div>
      <FloatingNav navItems={navItems} />
    </>
  );
}

export default Navbar;
