"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React from "react";
import { Scene } from "./Scene";

// organize into sections for the entire homepage animation
function Home() {
  return (
    <main className="relative">
      <section
        id="hero"
        className="container mx-auto mt-10 h-screen border-4 border-blue-500"
      >
        <h1 className="font-neighbor text-5xl font-semibold leading-10">
          UF Artificial Intelligence
        </h1>
        <Scene />
      </section>
      <section id="about" className="h-screen border-4 border-red-500">
        bello world
      </section>
    </main>
  );
}

export default Home;
