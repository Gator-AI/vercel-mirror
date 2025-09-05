"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "react-feather";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/logo-white.png";
// import { House } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      // Always show navbar when at the top
      if (current === 0) {
        setVisible(true);
      } else if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full border border-transparent dark:border-white/[0.2] px-6 md:px-10 py-5 flex items-center justify-between backdrop-blur-2xl",
          className
        )}
      >
        {/* Logo links to #about section */}
        <Link
          href="/#about"
          className="flex justify-center items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <Image src={Logo} alt="Star Icon" width={120} />
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center text-white"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
        {/* Desktop nav */}
        <nav className="hidden md:flex justify-center items-center gap-6">
          {navItems.map((navItem, idx) => (
            <Link
              key={`nav-item-${idx}`}
              href={navItem.link}
              className="group flex items-center gap-0 md:gap-2 relative font-neighbor font-light text-neutral-50 transition-colors"
            >
              <span className="block sm:hidden transition-colors group-hover:opacity-80">
                {navItem.icon}
              </span>
              <span className="text-xs md:text-sm transition-colors group-hover:text-secondary">
                {navItem.name}
              </span>
            </Link>
          ))}
        </nav>
        {/* Mobile nav menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute top-full left-0 w-full bg-[#409C8C] backdrop-blur-2xl flex flex-col items-center gap-6 py-8 z-50 md:hidden shadow-lg"
            >
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-nav-item-${idx}`}
                  href={navItem.link}
                  className="font-neighbor font-light text-neutral-50 text-lg py-2 px-6 w-full text-center hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {navItem.name}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

function Navbar() {
  // Updated navigation items with anchor links
  const navItems = [
    {
      name: "Projects",
      link: "/projects",
      // icon: <House size={20} />,
    },
    {
      name: "Lectures",
      link: "/lectures",
      // icon: <House size={20} />,
    },

    {
      name: "Events",
      link: "/events",
      // icon: <House size={20} />,
    },
    {
      name: "Calendar",
      link: "/calendar",
      // icon: <House size={20} />,
    },
  ];

  return <FloatingNav navItems={navItems} />;
}

export default Navbar;
