"use client";
import "./globals.css";
import HomeAnimation from "./components/HomeAnimation";
import Home from "@/components/Home";
import About from "./components/About";

export default function Index() {
  return (
    <>
      {/* Home page */}
      {/* Render only if the screen is wide enough (for large devices) */}
      <div className="hidden homeAnim:block w-screen">
        <HomeAnimation />
      </div>

      {/* About page */}
      <About />
    </>
  );
}
