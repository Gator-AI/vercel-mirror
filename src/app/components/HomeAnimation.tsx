"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { useEffect, useRef } from "react";
import { Laptop } from "./Laptop";

function Scene() {
  return (
    <div className="fixed mx-auto inset-0  w:[100%] lg:w-[80%] xlg:w-[70%] flex justify-center items-center">
      <Canvas className="" camera={{ position: [0, 0, 5], fov: 60 }}>
        <directionalLight
          intensity={3.5}
          position={[1, 2, 3]}
        ></directionalLight>

        <Laptop />

        {/* <axesHelper scale={2} /> */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

// organize into sections for the entire homepage animation
function HomeAnimation() {
  return (
    <main className="relative w-screen">
      <section
        id="animation-frame-1"
        className="container mx-auto mt-10 h-screen"
      >
        frame 1
      </section>

      <section id="animation-frame-2" className="h-screen">
        frame 2
      </section>

      <section id="animation-frame-3" className="h-screen">
        frame 3
      </section>
      <Scene />
    </main>
  );
}

export default HomeAnimation;
