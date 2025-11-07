"use client";
import React from "react";
import gbm2 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025.jpg";
import gbm2_2 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-2.jpg";
import gbm2_3 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-3.jpg";
import gbm2_4 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-4.jpg";
import gbm2_5 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-5.jpg";
import gbm2_6 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-6.jpg";
import gbm2_7 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-7.jpg";
import gbm2_8 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-8.jpg";
import gbm2_9 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-9.jpg";
import gbm2_10 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025-10.jpg";
import Carousel from "@/components/ui/Carousel";

const photos = [
  gbm2.src,
  gbm2_2.src,
  gbm2_3.src,
  gbm2_4.src,
  gbm2_5.src,
  gbm2_6.src,
  gbm2_7.src,
  gbm2_8.src,
  gbm2_9.src,
  gbm2_10.src,
];

export default function GBM2Page() {
  return (
    <div className="max-w-5xl mt-[100px] px-4 pb-20">
      <h1 className="text-4xl font-bold mb-4 font-neighbor">
        General Body Meeting 2
      </h1>
      <p className="text-lg mb-8 font-neighbor">
        Our second GBM of the semester was another fantastic gathering! We continued
        to build on the momentum from GBM 1, with members engaging in exciting new
        projects and opportunities. The meeting featured updates on ongoing initiatives,
        new project announcements, and continued community building.
      </p>
      <section className="mb-10">
        <h2 className="text-2xl font-neighbor font-semibold mb-2">
          Meeting Highlights
        </h2>
        <ul className="list-disc ml-6 font-neighbor">
          <li>
            Project Updates: We provided updates on our ongoing applied projects,
            showcasing the progress made by our technical teams and their plan for the rest of the semester.
          </li>
          <li>
            Technical Deep Dives: Our technical leads presented in-depth looks at
            their respective projects, covering the technologies, methodologies,
            and real-world applications being explored.
          </li>
          <li>
            Mini YC Pitch: We had a mini YC Pitch event where members pitched their 
            wild startup ideas and the winners received super cool and limited GatorAI T-Shirts!!!
          </li>
          <li>
            Upcoming Events: We announced the upcoming GatorAI X DSI Intern Panel that features 4 cracked
            AI/ML interns from companies like Amazon, CNEL Lab, and Microsoft.
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-neighbor font-semibold mb-2">
          Applied Projects & Technical Leads
        </h2>
        <p className="font-neighbor mb-4">
          Check out our applied projects and technical leads below! They put in a lot of hardwork these past months
          to build projects ranging from AI content generation to predictive market risk machine learning models.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-neighbor font-semibold mb-2">Slides</h2>
        <a
          href="https://docs.google.com/presentation/d/1IQ3fZD0yrLaVr8j3z7VAITDj1LTtyiUe36v8BU7NCyk/edit?slide=id.g35ce0b53674_0_41"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary underline"
        >
          View GBM 2 Slides
        </a>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-neighbor font-semibold mb-2">
          Photo Gallery
        </h2>
        <div className="w-full max-w-full h-96">
          <Carousel slides={photos} autoSlide autoSlideInterval={6000} />
        </div>
      </section>
    </div>
  );
}
