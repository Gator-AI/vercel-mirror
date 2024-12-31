"use client";
import "./globals.css";
import Home from "@/components/Home";
import About from "@/components/About";
import Involve from "@/components/Involve";

export default function Index() {
  return (
    <>
      {/* Home page */}
      {/* Render only if the screen is wide enough (for large devices) */}
      <div className="hidden homeAnim:block w-screen">
        <Home />
      </div>

      {/* About page */}
      <About />

      {/*Involvement page*/}
      <Involve />
    </>
  );
}
