"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { Laptop } from "./Laptop";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import Image from "next/image";
import homeImage from "@/images/home-page.png";
import ParticlesComponent from "@/components/ui/particles";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandDiscord,
} from "@tabler/icons-react";

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <directionalLight intensity={3.4} position={[1, 2, 3]} />
      <Laptop />
      {/* <ContactShadows opacity={0.3} position={[0, -0.2, 0]} /> */}
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

  // array for social media icons
  const socialItems = [
    {
      title: "Discord",
      icon: <IconBrandDiscord color="#00272b" />,
      href: "https://discord.com",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub color="#00272b" />,
      href: "https://github.com",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram color="#00272b" />,
      href: "https://instagram.com",
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/*particles background*/}
      <div className="absolute w-full h-[300vh] z-20">
        <ParticlesComponent />
      </div>
      {/*main content*/}
      <div
        id="animation-container"
        className="h-[300vh] w-full flex justify-center"
        ref={scrollRef}
      >
        {/*header*/}
        <motion.div
          id="header-container"
          className="fixed flex mt-48 flex-col items-center justify-center w-full gap-4"
          style={{ opacity: headerOpacity }}
        >
          <h1 className="font-neighbor text-6xl font-bold whitespace-nowrap">
            Welcome to <span className="text-secondary">GatorAI</span>
          </h1>
          <p className="font-neighbor text-lg font-light opacity-70">
            The University of Florida's Premier Artificial Intelligence Club
          </p>
        </motion.div>

        {/*floating dock*/}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50"
        >
          <FloatingDock items={socialItems} />
        </motion.div>

        {/*mouse indicator*/}
        <motion.div
          className="fixed z-20 bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center"
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
          className="fixed lg:w-[70%] md:w-[90%] sm:w-[100%] h-full pointer-events-none flex items-center justify-center z-10"
          style={{ opacity: modelOpacity }}
        >
          <Scene />
        </motion.div>

        <motion.div className="w-full self-end">
          <Image
            src={homeImage}
            alt="Description"
            className="mx-auto w-[1180px]  sm:h-[670px] object-cover"
          />
        </motion.div>
      </div>
    </main>
  );
}

export default HomeAnimation;
