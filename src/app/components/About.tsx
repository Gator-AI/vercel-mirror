import React from "react";
import PlaceholderLg from "@/images/placeholder-640x450.svg";
import PlaceholderMd from "@/images/placeholder.svg";
import Carousel from "@/components/Carousel";
import DesignBGMobile from "@/images/design-bg-mobile.svg";
import DesignBGDesktop from "@/images/design-bg-desktop.svg";
import { useState, useEffect } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import ShimmerButton from "@/components/ui/shimmer-button";

function About() {
  const slides = [PlaceholderLg, PlaceholderLg, PlaceholderLg].map(
    (image) => image.src
  );

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
      className=" w-full bg-[#409C8C] flex justify-center items-center bg-cover bg-center bg-no-repeat rounded-b-2xl"
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
            <h1 className="py-4 px-8 font-neighbor font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight w-full border-white border-b-[5px] flex justify-center">
              UF GatorAI
            </h1>
            <p className="text-base md:text-lg font-neighbor font-thin">
              The GatorAI club was founded in 1900 as the official club for
              artificial intelligence (AI) at UF. We welcome students and
              learners of all levels to explore the exciting world of artificial
              intelligence.
              <br />
              <br />
              Our mission is to make AI accessible to everyone and show its
              impact as a transformative tool in today's technological society.
            </p>
            <ShimmerButton
              borderRadius="10px"
              background="#00272b"
              className="py-2 px-8 mx-auto text-base font-neighbor font-light w-fit shadow-md"
            >
              Join our Discord!
            </ShimmerButton>
          </div>
          <MagicCard className="size-full absolute inset-0 items-start justify-center whitespace-nowrap shadow-md z-0" />
        </div>
      </div>
    </div>
  );
}

export default About;
