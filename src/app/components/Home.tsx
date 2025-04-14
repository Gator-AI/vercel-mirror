"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { Laptop } from "./Laptop";
import Image from "next/image";
import light from "@/images/light.svg";
import ParticlesComponent from "@/components/ui/particles";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandDiscord,
} from "@tabler/icons-react";
import { useState, useEffect, Suspense } from "react";

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <directionalLight intensity={3.4} position={[1, 2, 3]} />
      <Suspense fallback={null}>
        {/* prevents flickering */}
        <Laptop />
      </Suspense>
    </Canvas>
  );
}

function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);

  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY < 1200);
    };
    handleScroll(); // run on initial page load

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = scrollRef.current;
      if (element) {
        const distanceFromTop = element.getBoundingClientRect().top;
        setIsVisible(distanceFromTop > -500);
        // setIsParticleVisible(distanceFromTop > -1200);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const scrollIndicatorY = useTransform(scrollYProgress, [0, 1], [10, 40]);

  // array for social media icons
  const socialItems = [
    {
      title: "Discord",
      icon: <IconBrandDiscord color="#00272b" />,
      href: "https://discord.com/invite/WGWrZqtDvm",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub color="#00272b" />,
      href: "https://github.com/ufgatorai",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram color="#00272b" />,
      href: "https://www.instagram.com/uf_gatorai/",
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/*particles background and glow on the bottom*/}

      <div className="absolute w-full h-[350vh] z-20">
        <ParticlesComponent />
        <Image
          src={light}
          alt="Description"
          className="absolute bottom-0 w-full"
        />
      </div>

      {/*floating dock*/}
      <motion.div
        className={`${
          isFixed ? "fixed" : "absolute top-[1850px]"
        } bottom-12 left-1/2 transform -translate-x-1/2 z-20`}
      >
        <FloatingDock items={socialItems} />
      </motion.div>

      {/*main content*/}
      <div
        id="animation-container"
        className="h-[350vh] w-full flex justify-center"
        ref={scrollRef}
      >
        {/*header*/}
        {isVisible && (
          <motion.div
            id="header-container"
            className="fixed flex mt-48 flex-col items-center justify-center w-full gap-4"
            // style={{ opacity: headerOpacity }}
          >
            <h1 className="font-neighbor text-6xl font-bold whitespace-nowrap">
              Welcome to <span className="text-secondary">GatorAI</span>
            </h1>
            <p className="font-neighbor text-lg font-light opacity-70">
              The University of Florida&apos;s Premier Artificial Intelligence
              Club
            </p>
          </motion.div>
        )}

        {/*mouse indicator*/}

        <motion.div
          className={`${
            isFixed ? "fixed" : "absolute top-[1450px]"
          } z-20 bottom-1/2 left-[10%] transform -translate-x-1/2 flex justify-center`}
        >
          <div className="w-6 h-14 border-2 border-neutral-50 rounded-full flex justify-center items-start">
            <motion.div
              className="w-1 h-1 bg-neutral-50 rounded-full"
              style={{ y: scrollIndicatorY }}
            />
          </div>
        </motion.div>

        {/* Scene Container */}
        <motion.div
          className={`${
            isFixed ? "fixed" : "absolute top-[1200px]"
          } lg:w-[70%] md:w-[90%] sm:w-[100%] h-full pointer-events-none flex items-center justify-center`}
        >
          <Scene />
        </motion.div>
      </div>
    </main>
  );
}

export default Home;
