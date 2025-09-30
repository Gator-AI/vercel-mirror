"use client";

import React from "react";
import Image from "next/image";
import ShimmerButton from "@/components/ui/shimmer-button";
// import { SearchBar } from "@/components/ui/search-bar";
// import { Youtube } from "react-feather";
import mlmonday1 from "@/images/ml-mondays-thumbnails/mlmonday-1.png";
import mlmonday2 from "@/images/ml-mondays-thumbnails/mlmonday-2.png";
import mlmonday3 from "@/images/ml-mondays-thumbnails/mlmonday-3.png";

const VIDEOS = [
  {
    name: "AL/ML Lecture #3 : Logistic Regression",
    description:
      "An overview of Logistic Regression, Sigmoid Functions, Cross Entropy Loss, and more.",
    date: "September 29, 2025",
    link: "https://www.youtube.com/watch?v=y5wg1p91Dmo",
    image: mlmonday3,
  },
  {
    name: "AL/ML Lecture #2 : Linear Regression",
    description:
      "A look into Linear Regression, biases and variances, and loss functions.",
    date: "September 22, 2025",
    link: "https://www.youtube.com/watch?v=5vTdP2h_fi8",
    image: mlmonday2,
  },
  {
    name: "AL/ML Lecture #1 : What is AL/ML?",
    description:
      "An introductory lecture on Artificial Intelligence and Machine Learning concepts.",
    date: "September 15, 2025",
    link: "https://www.youtube.com/watch?v=dNu_f4ooCII&ab_channel=GatorAI",
    image: mlmonday1,
  },
  // {
  //   name: "AI Workshop Series",
  //   description: "Interactive workshops teaching AI fundamentals.",
  //   link: "https://github.com/GatorAI/ai-workshops",
  //   date: "March 10, 2024",
  //   image: "https://placehold.co/1100x430",
  // },
  // {
  //   name: "Event Calendar",
  //   description: "A calendar app to track club events and deadlines.",
  //   link: "https://github.com/GatorAI/event-calendar",
  //   date: "March 10, 2024",
  //   image: "https://placehold.co/1100x430",
  // },
];

function Projects() {
  return (
    <div className="my-32 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-start justify-start w-full">
          <h1 className="font-neighbor text-2xl md:text-5xl font-thin leading-none">
            Lecture Recordings
          </h1>
          <p className="font-neigbor mt-4 text-white/80 text-xl">
            Explore our latest lecture series on AI and machine learning.
          </p>
          <div className="mt-8 flex items-center justify-between w-full gap-4">
            {/* <SearchBar placeholder="Search recordings..." /> */}
            {/* <div className="bg-red-500 px-2 py-1 rounded-md hover:scale-105 flex items-center justify-center">
              <Youtube />
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {VIDEOS.map((video) => (
            <div
              key={video.name}
              className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="w-full h-40 bg-white/20 rounded mb-2 flex items-center justify-center">
                <Image
                  src={video.image}
                  alt={video.name + " image"}
                  width={320}
                  height={160}
                  className="object-cover w-full h-full"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  priority={false}
                />
              </div>
              <h2 className="font-neighbor text-xl md:text-2xl text-white mb-2">
                {video.name}
              </h2>
              <p className="font-neighbor text-sm text-white/80 mb-2">
                {video.description}
              </p>
              <p className="font-neighbor text-base font-bold text-white/80 mb-4">
                {video.date}
              </p>
              <div className="flex w-full gap-4 mt-auto">
                <a href={video.link} target="_blank">
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
