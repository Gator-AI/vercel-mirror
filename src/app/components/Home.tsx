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
  IconBrandLinktree,
} from "@tabler/icons-react";
import { useState, useEffect, Suspense } from "react";
import Logo from "@/images/logo-white-round-2.png";

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
      title: "LinkTree!",
      icon: <IconBrandLinktree color="#00272b" />,
      href: "https://linktr.ee/thegaitorclub",
    },
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
    <main className="w-full overflow-x-hidden overflow-y-visible">
      {/*particles background and glow on the bottom*/}

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-full max-w-[1920px] h-[250vh] 2xl:h-[200vh] z-20">
        <ParticlesComponent />
        <img
          src={light.src}
          alt=""
          width={1468}
          height={900}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen min-w-full max-w-none h-auto object-cover object-bottom"
        />
      </div>

      {/*floating dock*/}
      <motion.div
        className={`${isFixed ? "fixed" : "absolute top-[1850px] 2xl:top-[2400px]"
          } bottom-12 left-1/2 transform -translate-x-1/2 z-20`}
      >
        <FloatingDock items={socialItems} />
      </motion.div>

      {/*main content*/}
      <div
        id="animation-container"
        className="h-[250vh] 2xl:h-[200vh] w-full flex justify-center"
        ref={scrollRef}
      >
        {/*header*/}
        {isVisible && (
          <motion.div
            id="header-container"
            className="fixed flex mt-32 flex-col items-center text-center justify-center w-full gap-4 p-10"
          // style={{ opacity: headerOpacity }}
          >
            <h1 className="text-3xl md:text-6xl font-bold md:whitespace-nowrap">
              Welcome to <span className="text-secondary">GatorAI</span>
            </h1>
            <p className="text-md text-center md:text-lg font-light opacity-70">
              The University of Florida&apos;s Premier Artificial Intelligence
              Club
            </p>
          </motion.div>
        )}

        {/* mobile header
        <motion.div
          id="header-container"
          className="fixed flex md:hidden mt-48 flex-col items-center justify-center w-full gap-4"
          // style={{ opacity: headerOpacity }}
        >
          <h1 className="text-6xl font-bold whitespace-nowrap">
            Welcome to <span className="text-secondary">GatorAI</span>
          </h1>
          <p className="text-lg font-light opacity-70">
            The University of Florida&apos;s Premier Artificial Intelligence
            Club
          </p>
        </motion.div> */}

        {/*mouse indicator*/}

        <motion.div
          className={`${isFixed ? "fixed" : "absolute top-[1450px]"
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
          className={`${isFixed ? "fixed" : "absolute top-[1200px]"
            } lg:w-[70%] md:w-[90%] sm:w-[100%] h-full pointer-events-none hidden md:flex items-center justify-center `}
        >
          <Scene />
        </motion.div>
        <motion.div
          className={`${isFixed ? "fixed" : "absolute top-[400px]"
            } w-full h-full flex items-center justify-center md:hidden`}
        >
          <Image src={Logo} alt="Description" className="pt-40" width={150} />
        </motion.div>
      </div>
    </main>
  );
}

export default Home;
