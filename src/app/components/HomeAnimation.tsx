"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { Laptop } from "./Laptop";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import Image from "next/image";
import homeImage from "@/images/home-page.png";
import sun from "@/images/sun.png";
import earth from "@/images/earth.png";

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <directionalLight intensity={3.5} position={[1, 2, 3]} />
      <Laptop />
      <ContactShadows opacity={0.3} position={[0, -1.15, 0]} />
    </Canvas>
  );
}

function HomeAnimation() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const scrollIndicatorY = useTransform(scrollYProgress, [0, 1], [10, 30]);
  const modelOpacity = useTransform(scrollYProgress, [0, 0.99, 1], [1, 1, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);

  return (
    <main className="w-full">
      <div
        id="animation-container"
        className="h-[300vh] w-full flex justify-center"
        ref={scrollRef}
      >
        {/*header*/}
        <motion.div
          className="fixed flex my-56 flex-col items-center justify-center w-full gap-4"
          style={{ opacity: headerOpacity }}
        >
          <h1 className="font-neighbor text-6xl font-bold whitespace-nowrap">
            Welcome to <span className="text-secondary">GatorAI</span>
          </h1>
          <p className="font-neighbor text-lg">Scroll to continue.</p>
          <Image
            src={sun}
            alt="Description"
            width={300}
            height={300}
            className="fixed top-0 right-0"
          ></Image>
          <Image
            src={earth}
            alt="Description"
            width={800}
            height={800}
            className="fixed -bottom-96 -left-96"
          ></Image>
        </motion.div>

        {/*mouse indicator*/}
        <motion.div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center z-10"
          style={{ opacity: modelOpacity }}
        >
          <div className="w-7 h-12 border-2 border-neutral-50 rounded-full flex justify-center items-start">
            <motion.div
              className="w-1 h-1 bg-neutral-50 rounded-full"
              style={{ y: scrollIndicatorY }}
            />
          </div>
        </motion.div>

        <motion.div
          className="fixed lg:w-[70%] md:w-[90%] h-full pointer-events-none flex items-center justify-center"
          style={{ opacity: modelOpacity }}
        >
          <Scene />
        </motion.div>

        <motion.div className="w-full self-end">
          <Image
            src={homeImage}
            alt="Description"
            width={1300}
            height={900}
            className="w-full max-w-6xl mx-auto object-cover"
          />
        </motion.div>
      </div>
    </main>
  );
}

export default HomeAnimation;
