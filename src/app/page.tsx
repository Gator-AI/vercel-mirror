"use client";
import "./globals.css";
import Home from "@/components/Home";
import About from "@/components/About";
import Involve from "@/components/Involve";
import Officers from "@/components/Officers";
import FAQPage from "@/components/FAQ";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Home />
      <About />
      <Involve />
      <Officers />
      <FAQPage />

      {/* loading screen overlays everything while loading */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}
