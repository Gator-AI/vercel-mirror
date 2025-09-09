"use client";

import React from "react";
import Image from "next/image";
import ShimmerButton from "@/components/ui/shimmer-button";
import { SearchBar } from "@/components/ui/search-bar";
import { Youtube } from "react-feather";
const PROJECTS = [
  {
    name: "Website Redesign",
    description: "A modern, responsive website for GatorAI club.",
    date: "March 10, 2024",
    link: "https://github.com/GatorAI/club-site",
    image: "https://placehold.co/1100x430",
  },
  {
    name: "AI Workshop Series",
    description: "Interactive workshops teaching AI fundamentals.",
    link: "https://github.com/GatorAI/ai-workshops",
    date: "March 10, 2024",
    image: "https://placehold.co/1100x430",
  },
  {
    name: "Event Calendar",
    description: "A calendar app to track club events and deadlines.",
    link: "https://github.com/GatorAI/event-calendar",
    date: "March 10, 2024",
    image: "https://placehold.co/1100x430",
  },
];

function Projects() {
  return (
    <div className="my-24 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-start justify-start w-full">
          <h1 className="font-neighbor text-2xl md:text-5xl font-thin leading-none">
            Lecture Recordings
          </h1>
          <p className="mt-4 text-white/80 text-xl">
            Explore our latest lectures on AI and machine learning.
          </p>
          <div className="mt-8 flex items-center justify-between w-full gap-4">
            <SearchBar placeholder="Search recordings..." />
            <div className="bg-red-500 px-2 py-1 rounded-md hover:scale-105 flex items-center justify-center">
              <Youtube />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="w-full h-40 bg-white/20 rounded mb-2 flex items-center justify-center">
                <Image
                  src={project.image.replace("/public", "")}
                  alt={project.name + " image"}
                  width={320}
                  height={160}
                  className="object-contain w-full h-full"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  priority={false}
                />
              </div>
              <h2 className="font-neighbor text-xl md:text-2xl text-white mb-1">
                {project.name}
              </h2>
              <p className="text-white/80 mb-2">{project.description}</p>
              <p className="text-white/80 mb-2">{project.date}</p>
              <div className="flex w-full gap-4 mt-auto">
                <a href="https://github.com" target="_blank">
                  <ShimmerButton
                    borderRadius="10px"
                    background="#00272b"
                    className="py-2 px-8  text-base font-neighbor font-light w-fit shadow-md"
                  >
                    View on YouTube
                  </ShimmerButton>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
