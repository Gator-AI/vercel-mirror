import React from "react";
import hypergator from "@/images/hypergator-tour.jpg";
import workshop from "@/images/workshop.webp";
import officers from "@/images/officers.webp";
import Carousel from "@/components/ui/Carousel";
import DesignBGMobile from "@/images/design-bg-mobile.svg";
import DesignBGDesktop from "@/images/design-bg-desktop.svg";
import { useState, useEffect } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import ShimmerButton from "@/components/ui/shimmer-button";
import RoundLogo from "@/images/logo-white.png";
import Image from "next/image";

function About() {
  const slides = [hypergator, workshop, officers].map((image) => image.src);

  const [backgroundImage, setBackgroundImage] = useState(DesignBGMobile.src);

  useEffect(() => {
    const updateBackground = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setBackgroundImage(DesignBGDesktop.src);
      } else {
        setBackgroundImage(DesignBGMobile.src);
      }
    };
    updateBackground();

    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <div
      className=" w-full bg-[#409C8C] flex justify-center items-center bg-cover bg-center bg-no-repeat rounded-b-2xl z-50"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-[80%] mx-auto my-32 flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* image slider */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <Carousel slides={slides} />
        </div>

        {/* content */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10 flex flex-col gap-8 p-6 ">
            <div className="border-white border-b-[5px] w-full flex justify-center items-center gap-2 pb-4">
              {/* <h1 className="font-neighbor font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight justify-center">
                UF
              </h1> */}
              <Image
                className=""
                src={RoundLogo}
                width={250}
                alt="gator ai logo round"
              />
            </div>

            <p className="text-base md:text-lg font-neighbor font-thin">
              Welcome to GatorAI! We are the official club for artificial
              intelligence (AI) at UF. We&apos;re here for learners of all
              levels to explore the exciting world of artificial intelligence.
              <br />
              <br />
              Our mission is to make AI accessible to everyone and show its
              impact as a transformative tool in today&apos;s technological
              society.
            </p>
            <a
              href="https://discord.com/invite/WGWrZqtDvm"
              className="mx-auto"
              target="_blank"
            >
              <ShimmerButton
                borderRadius="10px"
                background="#00272b"
                className="py-2 px-8  text-base font-neighbor font-light w-fit shadow-md"
              >
                Join our Discord!
              </ShimmerButton>
            </a>
          </div>
          <MagicCard className="size-full absolute inset-0 items-start justify-center whitespace-nowrap shadow-md z-0" />
        </div>
      </div>
    </div>
  );
}

export default About;
