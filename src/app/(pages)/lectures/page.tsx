"use client";

import React from "react";
import Image from "next/image";
import ShimmerButton from "@/components/ui/shimmer-button";
import { SearchBar } from "@/components/ui/search-bar";
// import { Youtube } from "react-feather";

const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BLOB_BASE_URL is not set");
}

const VIDEOS = [
    {
    name: "ML Mondays #2: Python Dependency Management",
    description:
      "A lecture on how to maintain python dependencies and libraries.",
    date: "February 9th, 2026",
    semester: "Spring 2026",
    link: "https://www.youtube.com/watch?v=-X6LbOXprq0",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-1.png`,
  },
  {
    name: "ML Mondays #1: Review of AI/ML Fundamentals",
    description:
      "An introductory lecture on Artificial Intelligence and Machine Learning concepts.",
    date: "February 2nd, 2026",
    semester: "Spring 2026",
    link: "https://www.youtube.com/watch?v=AoIomknRDw8",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-1.png`,
  },
  {
    name: "ML Mondays #10: AutoEncoders and GANs",
    description:
      "Exploring AutoEncoders, Generative Adversarial Networks, and their applications.",
    date: "November 17th, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=pdJ9cpEqIMM",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-10.png`,
  },
  {
    name: "ML Mondays #9: Recurrent Neural Networks (RNNs)",
    description:
      "Understanding RNNs, LSTMs, and their applications in sequence data.",
    date: "November 10th, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=LyunT1PY6sw",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-9.png`,
  },
  {
    name: "ML Mondays #8 : Convolutional Neural Networks",
    description: "Learn about Layers, Filters, and Sampling/Pooling.",
    date: "November 3rd, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=Nq8cv_v9Ieg",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-8.png`,
  },
  {
    name: "ML Mondays #7 : Training Deep Neural Networks",
    description:
      "Transfer Learning and Building a Neural Network with pytorch.",
    date: "October 27th, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=smMlQojzl0M",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-7.png`,
  },
  {
    name: "ML Mondays #6: Training Neural Networks",
    description: "Neurons, Gradient Descent, Hyperparameters, and more.",
    date: "October 20th, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=vVBbLo6R-6k",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-6.png`,
  },
  {
    name: "ML Mondays #5: Feed Forward Neural Networks",
    description:
      "Structure of Feed Forward Neural Networks, Activation Functions, and Backpropagation.",
    date: "October 13th, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=AjKgtfKGYtg",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-5.png`,
  },
  {
    name: "ML Mondays #4: Optimization and Gradient Descent",
    description:
      "An in-depth look at optimization techniques, gradient descent, and learning rates.",
    date: "October 6th, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=TKhlZGvAqQI",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-4.png`,
  },
  {
    name: "ML Mondays #3: Logistic Regression",
    description:
      "An overview of Logistic Regression, Sigmoid Functions, Cross Entropy Loss, and more.",
    date: "September 29th, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=y5wg1p91Dmo",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-3.png`,
  },
  {
    name: "ML Mondays #2: Linear Regression",
    description:
      "A look into Linear Regression, biases and variances, and loss functions.",
    date: "September 22nd, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=5vTdP2h_fi8",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-2.png`,
  },
  {
    name: "ML Mondays #1: What is AL/ML?",
    description:
      "An introductory lecture on Artificial Intelligence and Machine Learning concepts.",
    date: "September 15th, 2025",
    semester: "Fall 2025",
    link: "https://www.youtube.com/watch?v=dNu_f4ooCII&ab_channel=GatorAI",
    image: `${baseUrl}/images/ml-monday-thumbnails-fall-2025/mlmonday-1.png`,
  }
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

const SEMESTERS = ["All semesters", "Spring 2026", "Fall 2025"];

function Projects() {
  const [query, setQuery] = React.useState("");
  const [semester, setSemester] = React.useState("All semesters");
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const semesterOptions = SEMESTERS;

  const filteredVideos = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return VIDEOS.filter((video) => {
      if (semester !== "All semesters" && video.semester !== semester) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        video.name,
        video.description,
        video.date,
        video.semester,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query, semester]);

  return (
    <div className="my-32 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-start justify-start w-full">
          <h1 className="text-2xl md:text-5xl font-thin leading-none">
            Lecture Recordings
          </h1>
          <p className="font-neigbor mt-4 text-white/80 text-xl">
            Explore our latest lecture series on AI and machine learning.
          </p>
          <div className="mt-8 flex flex-col items-stretch w-full gap-4 md:flex-row md:items-center">
            <SearchBar
              placeholder="Search recordings..."
              value={query}
              onChange={setQuery}
              inputRef={searchInputRef}
              className="w-full md:flex-1 md:min-w-[320px]"
              inputClassName="font-neigbor"
            />
            <label className="w-full md:w-56 md:shrink-0">
              <span className="sr-only">Filter by semester</span>
              <select
                value={semester}
                onChange={(event) => setSemester(event.target.value)}
                className="w-full rounded-md border border-white/40 bg-white/5 px-3 py-2 text-white font-neigbor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {semesterOptions.map((option) => (
                  <option key={option} value={option} className="text-black">
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {/* <div className="bg-red-500 px-2 py-1 rounded-md hover:scale-105 flex items-center justify-center">
              <Youtube />
            </div> */}
          </div>
        </div>
        {filteredVideos.length === 0 ? (
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/80">
            <p>No recordings match your search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                searchInputRef.current?.focus();
              }}
              className="mt-3 text-sm text-white underline decoration-white/40 underline-offset-4 hover:text-white/90"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredVideos.map((video) => (
              <div
                key={video.name}
                className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="w-full h-50 bg-white/20 rounded mb-2 flex items-center justify-center">
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
                <h2 className="text-xl md:text-2xl text-white mb-2">
                  {video.name}
                </h2>
                <p className="text-sm text-white/80 mb-2">
                  {video.description}
                </p>
                <p className="text-base font-bold text-white/80 mb-4">
                  {video.date}
                </p>
                <div className="flex w-full gap-4 mt-auto">
                  <a href={video.link} target="_blank">
                    <ShimmerButton
                      borderRadius="10px"
                      background="#00272b"
                      className="py-2 px-8  text-base font-light w-fit shadow-md"
                    >
                      View on YouTube
                    </ShimmerButton>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
