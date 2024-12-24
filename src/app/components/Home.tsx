"use client";
import React from "react";
import Image from "next/image";
import sun from "@/images/sun.png";
import earth from "@/images/earth.png";

function Home() {
  return (
    <div className="relative mx-auto font-neighbor font-normal h-screen w-full flex flex-col items-center pt-64 gap-6 z-30">
      <Image
        className="absolute top-0 right-0"
        src={sun}
        width={300}
        height={300}
        alt="sun image"
      />
      <Image
        className="absolute -bottom-72 -left-60"
        width={600}
        height={600}
        src={earth}
        alt="earth image"
      />
    </div>
  );
}

export default Home;
