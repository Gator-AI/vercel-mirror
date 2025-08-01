"use client";

import React from "react";
import Image from "next/image";
import ShimmerButton from "@/components/ui/shimmer-button";
import { GitHub } from "react-feather";
const PROJECTS = [
  {
    name: "Website Redesign",
    description: "A modern, responsive website for GatorAI club.",
    link: "https://github.com/GatorAI/club-site",
    image: "https://placehold.co/320x180",
  },
  {
    name: "AI Workshop Series",
    description: "Interactive workshops teaching AI fundamentals.",
    link: "https://github.com/GatorAI/ai-workshops",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Event Calendar",
    description: "A calendar app to track club events and deadlines.",
    link: "https://github.com/GatorAI/event-calendar",
    image: "https://placehold.co/320x180",
  },
];

function Projects() {
  return (
    <div className="my-24 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[90%] max-w-5xl h-full flex flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-neighbor text-2xl md:text-5xl font-thin leading-none">
            Projects
          </h1>
          <p className="mt-2 text-white/80 text-xl">
            Explore our club&apos;s latest projects and contributions.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a href="https://github.com" target="_blank">
              <ShimmerButton
                borderRadius="10px"
                background="#00272b"
                className="py-2 px-8 text-base font-neighbor font-light w-fit shadow-md gap-2"
              >
                Checkout our GitHub Repo
              </ShimmerButton>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col gap-3 hover:scale-[1.01] transition-transform duration-200"
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
              <div className="flex w-full justify-between mt-auto">
                <a href="https://github.com" target="_blank">
                  <ShimmerButton
                    borderRadius="10px"
                    background="#00272b"
                    className="py-2 px-8  text-base font-neighbor font-light w-fit shadow-md"
                  >
                    View on GitHub
                  </ShimmerButton>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="bg-white/50 p-2 rounded-full"
                >
                  <GitHub />
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
