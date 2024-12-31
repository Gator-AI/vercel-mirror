import React from "react";
import Placeholder from "@/images/placeholder-640x450.svg";
import Carousel from "@/components/Carousel";
import DesignBGMobile from "@/images/design-bg-mobile.svg";
import DesignBGDesktop from "@/images/design-bg-desktop.svg";
import { useState, useEffect } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import ShimmerButton from "@/components/ui/shimmer-button";

function About() {
  const slides = [Placeholder, Placeholder, Placeholder].map(
    (image) => image.src
  );

  // dynamically change background for different window sizes
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
    <>
      <div
        className="w-full py-20 min-h-screen bg-[#409C8C] flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="w-[80%] lg:w-[1296px] max-h-[450px] flex justify-evenly items-center flex-col lg:flex-row gap-4">
          {/* image slider */}
          <div className=" flex justify-end basis-1/2">
            <Carousel slides={slides} />
          </div>
          {/*content*/}
          <div className=" h-full w-[450px] basis-1/2 flex items-start justify-between relative">
            <div className="p-10 size-full text-wrap flex flex-col justify-start gap-8 z-10">
              <h1 className="py-4 px-8 font-neighbor font-bold text-4xl md:text-6xl tracking-tight rounded-xl shadow-md w-fit border-white border-r-[5px] border-b-[5px]">
                UF Gator AI
              </h1>
              <p className="text-lg font-neighbor font-thin">
                The GatorAI club was founded in 1900 as the official club for
                artificial intelligence (AI) at UF. We welcome students and
                learners of all levels to explore the exciting world of
                artificial intelligence.
                <br />
                <br />
                Our mission is to make AI accessible to everyone and show its
                impact as a transformative tool in today’s technological
                society.
              </p>
              <ShimmerButton
                borderRadius="10px"
                background="#00272b"
                className="text-xl font-neighbor font-semibold w-1/2 mt-auto"
              >
                Join the Discord!
              </ShimmerButton>
            </div>
            <MagicCard className="absolute h-full items-start justify-center whitespace-nowrap shadow-2xl z-0"></MagicCard>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
