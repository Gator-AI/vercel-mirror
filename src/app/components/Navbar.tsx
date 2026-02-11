"use client";
import React, { useState, useRef, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Logo from "@/images/logo-white.png";
// import { House } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
  user,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  user: { id: string } | null;
}) => {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const yNum = typeof y === "number" ? y : 0;
    const prev = lastScrollY.current;
    lastScrollY.current = yNum;
    // At top: always show
    if (yNum <= 0) {
      setVisible(true);
      return;
    }
    // Scrolling down: hide. Scrolling up: show.
    if (yNum > prev) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full border border-transparent dark:border-white/[0.2] px-6 md:px-10 py-5 md:pt-12 flex items-center justify-between backdrop-blur-2xl",
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
              className="group flex items-center gap-0 md:gap-2 relative font-light text-neutral-50 transition-colors"
            >
              <span className="block sm:hidden transition-colors group-hover:opacity-80">
                {navItem.icon}
              </span>
              <span className="text-xs md:text-lg transition-colors group-hover:text-secondary">
                {navItem.name}
              </span>
            </Link>
          ))}
          {user ? (
            <Button variant="outline" size="sm" onClick={handleSignOut} className="rounded-lg border-white/20 text-neutral-50 hover:bg-white/10 hover:text-white">
              Sign out
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="rounded-lg border-white/20 text-neutral-50 hover:bg-white/10 hover:text-white">
              <Link href="/login">Sign in</Link>
            </Button>
          )}
        </nav>
        {/* Mobile nav menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute top-full left-0 w-full bg-[#00272b] backdrop-blur-2xl flex flex-col items-center gap-6 py-8 z-50 md:hidden shadow-lg"
            >
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-nav-item-${idx}`}
                  href={navItem.link}
                  className="font-light text-neutral-50 text-lg py-2 px-6 w-full text-center hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {navItem.name}
                </Link>
              ))}
              {user ? (
                <Button variant="outline" size="sm" onClick={() => { handleSignOut(); setMenuOpen(false); }} className="rounded-lg border-white/20 text-neutral-50 hover:bg-white/10 hover:text-white mt-2">
                  Sign out
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm" className="w-full rounded-lg border-white/20 text-neutral-50 hover:bg-white/10 hover:text-white mt-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    Sign in
                  </Link>
                </Button>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

function Navbar() {
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { name: "Projects", link: "/projects" },
    { name: "Lectures", link: "/lectures" },
    { name: "Events", link: "/events" },
    { name: "Calendar", link: "/calendar" },
  ];

  return <FloatingNav navItems={navItems} user={user} />;
}

export default Navbar;
