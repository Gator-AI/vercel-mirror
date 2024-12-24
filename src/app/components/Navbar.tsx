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
        setVisible(true);
      } else {
        setVisible(false);
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
          "fixed top-0 left-0 right-0 z-50 flex w-full border border-transparent bg-[#00272b] dark:border-white/[0.2] dark:bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-10 py-5 items-center justify-between backdrop-blur-2xl",
          className
        )}
      >
        <Link
          href="/"
          className="flex justify-center items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <Image src={StarIcon} alt="Star Icon" width={25} height={25} />
          <p className="text-2xl font-neighbor font-normal">GatorAI</p>
        </Link>
        <nav className="flex justify-center items-center gap-6">
          {navItems.map((navItem, idx) => (
            <Link
              key={`nav-item-${idx}`}
              href={navItem.link}
              className="group flex items-center gap-2 relative font-neighbor font-light text-neutral-50 transition-colors"
            >
              <span className="block sm:hidden transition-colors group-hover:opacity-80">
                {navItem.icon}
              </span>
              <span className="text-md transition-colors group-hover:text-secondary">
                {navItem.name}
              </span>
            </Link>
          ))}
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <House size={20} />,
    },
    {
      name: "About",
      link: "/about",
      icon: <Info size={20} />,
    },
    {
      name: "Programs",
      link: "/programs",
      icon: <CodeXml size={20} />,
    },
    {
      name: "FAQs",
      link: "/faqs",
      icon: <CircleHelp size={20} />,
    },
  ];

  return <FloatingNav navItems={navItems} />;
}

export default Navbar;
