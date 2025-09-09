"use client";

import React from "react";
import Image from "next/image";
import ShimmerButton from "@/components/ui/shimmer-button";
import { GitHub } from "react-feather";
const PROJECTS = [
  {
    name: "CanvasGPT",
    description: "Create a safe, Course-Specific AI tutor in minutes",
    techStack: [
      "Python",
      "FastAPI",
      "Hugging Face",
      "LlamaIndex, Chroma, React, Canvas LTI",
    ],
    difficulty: "Intermediate",
    link: "https://github.com/ufgatorai",
    image: "https://placehold.co/320x180",
  },
  {
    name: "ContentAI",
    description:
      "An AI-powered, full-stack system that autonomously ideates, creates, and posts engaging content on Instagram daily.",
    techStack: [
      "CrewAI/Autogen",
      "LlamaIndex",
      "Instagram Graph API",
      "FastAPI",
      "ReactJs",
    ],
    difficulty: "Advanced",
    link: "https://github.com/ufgatorai",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Gator Course Advisor",
    description:
      "Gator Course Advisor uses AI to find the perfect UF electives tailored just for you.",
    link: "https://github.com/ufgatorai",
    techStack: ["Python", "Pandas", "SkLearn", "Surprise", "Streamlit/Flask"],
    difficulty: "Intermediate",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Quant Lab",
    description:
      "A platform to test trading strategies on past data with an ML model suggesting improvements.",
    link: "https://github.com/ufgatorai",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "APIs (Yahoo Finance, Quandl)",
      "Matplotlib",
      "SkLearn",
      "SQL",
    ],
    difficulty: "Intermediate",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Keyframe",
    description:
      "AI-powered video generator to create entertaining videos of your liking.",
    link: "https://github.com/ufgatorai",
    techStack: [
      "HTML + CSS",
      "Python",
      "MoviePy",
      "DeepSeek/OpenAI",
      "Suno/Aiva",
      "ElevenLabs",
    ],
    difficulty: "Intermediate",
    image: "https://placehold.co/320x180",
  },
  {
    name: "AI-Assisted Roblox Game Development Lab",
    description: "Use AI tools to help build a playable Roblox game",
    link: "https://github.com/ufgatorai",
    techStack: ["Python", "Pandas", "SkLearn", "Surprise", "Streamlit/Flask"],
    difficulty: "Beginner",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Cryptocurrency Fraud Detection",
    description: "Train an AI model to detect front running attempts",
    link: "https://github.com/ufgatorai",
    techStack: ["Tensorflow", "MongoDB", "Websocket"],
    difficulty: "Beginner/Hard",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Market Risk Identification",
    description:
      "Identify clusters of risk in financial markets through unsupervised ML",
    link: "https://github.com/ufgatorai",
    techStack: [
      "Python, PyTorch, SkLearn",
      "Pandas",
      "Matplotlib",
      "BeautifulSoup",
      "Requests",
      "APIs",
    ],
    difficulty: "Intermediate",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Study Buddy (SAT Prep)",
    description:
      "Study platform using adaptive learning and AI to deliver personalized flashcards, quizzes, and progress tracking.",
    link: "https://github.com/ufgatorai",
    techStack: [
      "HTML + CSS",
      "Node.js + Express",
      "Render",
      "React",
      "MongoDB",
      "OpenAI",
    ],
    difficulty: "Intermediate",
    image: "https://placehold.co/320x180",
  },
  {
    name: "HuntingParty.ai",
    description:
      "AI powered financial modeling solution for commercial real estate investors",
    link: "https://github.com/ufgatorai",
    techStack: [
      "Python",
      "Streamlit",
      "PyTorch",
      "TensorFlow",
      "Pandas",
      "NumPy",
      "OpenAI",
      "SkLearn",
      "APIs",
    ],
    difficulty: "Advanced",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Theory of Mind Simulator",
    description: "AI powered prisoner's dilemma simulation",
    link: "https://github.com/ufgatorai",
    techStack: ["Python", "Streamlit", "PyTorch", "TensorFlow", "OpenAI"],
    difficulty: "Advanced",
    image: "https://placehold.co/320x180",
  },
  {
    name: "SafeTrip IQ",
    description: "AI powered travel safety advisor",
    link: "https://github.com/ufgatorai",
    techStack: [
      "Python",
      "Javascript",
      "HF Transformers",
      "XGBoost",
      "FastAPI",
      "Selenium",
      "Docker",
      "MLflow",
    ],
    difficulty: "Intermediate",
    image: "https://placehold.co/320x180",
  },
  {
    name: "Real-time Lane Departure Warning System",
    description:
      "Real-time AI System capable of detecting lane departures to enhance driving safety",
    link: "https://github.com/ufgatorai",
    techStack: ["Python", "PyTorch", "NumPy", "Raspberry Pi"],
    difficulty: "Advanced",
    image: "https://placehold.co/320x180",
  },
];

function Projects() {
  return (
    <div className="my-24 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-neighbor text-2xl md:text-5xl font-thin leading-none">
            Projects
          </h1>
          <p className="mt-2 text-white/80 text-xl">
            Explore our club&apos;s latest projects and contributions.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a href="https://linktr.ee/thegaitorclub" target="_blank">
              <ShimmerButton
                borderRadius="10px"
                background="#00272b"
                className="py-2 px-8 text-base font-neighbor font-light w-fit shadow-md gap-2"
              >
                Visit the LinkTree to Apply Now!
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
              <div className="flex flex-col items-start justify-between gap-1 h-full min-h-[180px]">
                <div>
                  <h2 className="font-neighbor font-bold text-xl md:text-2xl text-white mb-1">
                    {project.name}
                  </h2>
                  <p className="font-neighbor text-[#F59E0B] text-md leading-none">
                    {project.description}
                  </p>
                </div>
                {/* <div className="flex-grow" /> */}
                {project.techStack?.length ? (
                  <div className="bg-[#00272b]/50 p-2 rounded-md flex flex-col gap-1">
                    <p className=" w-fit font-neighbor text-md">
                      Difficulty:{" "}
                      <span className="bg-[#F59E0B] rounded-full px-2 py-[2px] ">
                        {project.difficulty}
                      </span>
                    </p>
                    <p className="font-neighbor">Tech Stack:</p>
                    <p className="font-neighbor text-[#6FFFE4]">
                      {project.techStack.join(", ")}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="flex w-full justify-between mt-auto">
                <a href="/events/gbm1" target="_blank">
                  <ShimmerButton
                    borderRadius="10px"
                    background="#00272b"
                    className="py-2 px-8  text-base font-neighbor font-light w-fit shadow-md"
                  >
                    Learn More
                  </ShimmerButton>
                </a>
                <a
                  href="https://github.com/ufgatorai"
                  target="_blank"
                  className="bg-white/50 p-2 rounded-full hover:scale-105 transition-transform"
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
