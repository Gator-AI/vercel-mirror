"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React from "react";
import { Scene } from "./Scene";

// organize into sections for the entire homepage animation
function Hero() {
  return (
    <div className="container mx-auto mt-10 h-screen border-2">
      <h1 className="font-neighbor text-5xl font-semibold leading-10">
        UF Artificial Intelligence
      </h1>
      <Scene />
    </div>
  );
}

export default Hero;
