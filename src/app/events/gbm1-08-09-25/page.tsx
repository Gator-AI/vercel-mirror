"use client";
import React from "react";
import gbm1 from "@/images/events-photos/GBM1-Fall-2025.jpg";
import gbm1_2 from "@/images/events-photos/GBM-1-Fall-2025-2.jpg";
import gbm1_3 from "@/images/events-photos/GBM-1-Fall-2025-3.jpg";
import gbm1_4 from "@/images/events-photos/GBM-1-Fall-2025-4.jpg";
import gbm1_5 from "@/images/events-photos/GBM-1-Fall-2025-5.jpg";
import gbm1_6 from "@/images/events-photos/GBM-1-Fall-2025-6.jpg";
import gbm1_7 from "@/images/events-photos/GBM-1-Fall-2025-7.jpg";
import gbm1_8 from "@/images/events-photos/GBM-1-Fall-2025-8.jpg";
import gbm1_9 from "@/images/events-photos/GBM-1-Fall-2025-9.jpg";
import gbm1_10 from "@/images/events-photos/GBM-1-Fall-2025-10.jpg";
import Carousel from "@/components/ui/Carousel";

const photos = [
  gbm1.src,
  gbm1_2.src,
  gbm1_3.src,
  gbm1_4.src,
  gbm1_5.src,
  gbm1_6.src,
  gbm1_7.src,
  gbm1_8.src,
  gbm1_9.src,
  gbm1_10.src,
  // Add more images here as needed
];

export default function GBM1Page() {
  return (
    <div className="max-w-5xl mt-[100px] px-4 pb-20">
      <h1 className="text-4xl font-bold mb-4 font-neighbor">
        General Body Meeting 1
      </h1>
      <p className="text-lg mb-8 font-neighbor">
        Our first GBM of the semester was a huge success! We had a turnout of
        <span className="text-secondary"> 270+ members </span>and gained{" "}
        <span className="text-secondary">1000+ </span>
        new followers on our instagram. We introduced the GatorAI board members,
        shared our mission, and highlighted upcoming opportunities for members
        to get involved.
      </p>
      <section className="mb-10">
        <h2 className="text-2xl font-neighbor font-semibold mb-2">
          Meeting Higlights
        </h2>
        <ul className="list-disc ml-6 font-neighbor">
          <li>
            We started with an AI Bingo icebreaker where members had to find
            others with specific AI-related skills or experiences. The top three
            winners received prizes (super cool GatorAI stickers)!
          </li>
          <li>
            Next we introduced our board members and technical leads, each
            bringing unique expertise to GatorAI. Members learned about
            leadership roles and how to connect with the team.
          </li>
          <li>
            ML Mondays: Every Monday at the Informatics Institute, we host
            hands-on machine learning workshops. All skill levels are welcome!
          </li>
          <li>
            Social Events: Our social events coordinators have been working very
            hard to keep our community engaged. <br></br>Look out for the Trail
            Mix Social coming up soon,{" "}
            <span className="text-secondary">09/15/2025 @ 5:00 PM</span>, at the
            Informatics Institute! 👀
          </li>
          <li>
            Mentor Mentee: Last but not least, our mentor-mentee program pairs
            experienced members with newcomers for guidance and support.{" "}
            <br></br> Sign up by visting our{" "}
            <span className="text-secondary">
              <a
                href="https://linktr.ee/thegaitorclub"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkTree!
              </a>
            </span>
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-neighbor font-semibold mb-2">
          Applied Projects & Technical Leads
        </h2>
        <p className="font-neighbor mb-4">
          Members can join applied projects led by our technical leads, working
          on real-world problems and gaining practical experience in AI. To
          learn more about the projects and our technical leads, please take a
          look at the slides below.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-neighbor font-semibold mb-2">Slides</h2>
        {/* Replace the link below with your actual slides URL or embed */}
        <a
          href="https://docs.google.com/presentation/d/19h8pz7uE9LyKzXvEDuP9ZyICdpQPcvoqr-70aCKVoQI/edit"
          target="_blank"
          rel="noopener"
          className="text-secondary underline"
        >
          GBM 1
        </a>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-neighbor font-semibold mb-2 h-">
          Photo Gallery
        </h2>
        <div className="w-full max-w-full h-96">
          <Carousel slides={photos} autoSlide autoSlideInterval={6000} />
        </div>
      </section>
    </div>
  );
}
