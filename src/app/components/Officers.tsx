import React from "react";
import { Carousel, FlipCard } from "./ui/apple-cards-carousel";
// import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BLOB_BASE_URL is not set");
}

const currentOfficers = [
  {
    category: "President",
    title: "Divya Verma",
    src: `${baseUrl}/images/officer-photos/divya.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/divya-verma48/"
  },
  {
    category: "Internal VP",
    title: "Jackson Jones",
    src: `${baseUrl}/images/officer-photos/jackson.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/jackson-e-jones/"
  },
  {
    category: "External VP",
    title: "Realin Damuth",
    src: `${baseUrl}/images/officer-photos/realin.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/realin-damuth/"
  },
  {
    category: "Education Lead",
    title: "Kartik Kathuria",
    src: `${baseUrl}/images/officer-photos/kartik.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/kartik-kathuria/"
  },
  {
    category: "Webmaster",
    title: "Kushagra Katiyar",
    src: `${baseUrl}/images/officer-photos/kushagra.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/kushagrakatiyar/"
  },
  {
    category: "ML Lecturer",
    title: "Sivan Pushpagiri",
    src: `${baseUrl}/images/officer-photos/sivan.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/sivanreddypushpagiri/"
  },
  {
    category: "ML Lecturer",
    title: "Sriniketh Subramanian",
    src: `${baseUrl}/images/officer-photos/sriniketh.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/sriniketh-subramanian/"
  },
  {
    category: "Web Team",
    title: "Jerry Xiao",
    src: `${baseUrl}/images/officer-photos/jerry.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/yufei-xiao-1a4971329/"
  },
];

const alumni = [
  {
    category: "Alumni · Former President",
    title: "Rohan Shah",
    src: `${baseUrl}/images/officer-photos/rohan.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/rohanshah004/"
  },
  {
    category: "Alumni · Former Education Director",
    title: "Alvin Wong",
    src: `${baseUrl}/images/officer-photos/alvin.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/alvin-wong-uf/"
  },
];

const pastMembers = [
  {
    category: "Former Vice President",
    title: "Analise Stuart",
    src: `${baseUrl}/images/officer-photos/analise.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/analise-stuart-366425301/"
  },
  {
    category: "Former Secretary",
    title: "Grace Cavarretta",
    src: `${baseUrl}/images/officer-photos/grace-2.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/grace-cavarretta/"
  },
  {
    category: "Former Treasurer",
    title: "Sara Lin",
    src: `${baseUrl}/images/officer-photos/sara-2.jpg`,
    backContent: "Don't compare yourself with other people; compare yourself with who you were yesterday.",
    linkedin: "https://www.linkedin.com/in/linsaraj/"
  },
  {
    category: "Former Applied Lead",
    title: "Andy Vu",
    src: `${baseUrl}/images/officer-photos/andy.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/adv-andrew-d-vu/"
  },
  {
    category: "Former Corp Relations",
    title: "Taher Akolawala",
    src: `${baseUrl}/images/officer-photos/taher.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/taher51/"
  },
  {
    category: "Former Social Events",
    title: "Sarvagna Sangaraju",
    src: `${baseUrl}/images/officer-photos/sarvagna.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/sarvi-sangaraju/"
  },
  {
    category: "Former Webmaster",
    title: "Stanley Ke",
    src: `${baseUrl}/images/officer-photos/stanley.jpg`,
    backContent: "If you don't believe in yourself, nobody else will.",
    linkedin: "https://www.linkedin.com/in/stanley-ke/"
  },
];

function Officers() {
  const currentCards = currentOfficers.map((card, index) => (
    <FlipCard key={index} card={card} />
  ));
  const alumniCards = alumni.map((card, index) => (
    <FlipCard key={index} card={card} />
  ));
  const pastCards = pastMembers.map((card, index) => (
    <FlipCard key={index} card={card} size="sm" />
  ));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10" id="officers">
      <div className="size-full flex flex-col items-start justify-center gap-8">
        {/* Current Officers */}
        <div className="flex flex-col p-5">
          <p className="font-bold text-base text-secondary">Board 25-26</p>
          <h1 className="text-2xl md:text-5xl font-thin leading-none">
            Meet the officers and mentors!
          </h1>
        </div>

        <div className="relative w-full py-8 rounded-xl flex items-center justify-center">
          <div className="w-full">
            <Carousel items={currentCards} />
          </div>
        </div>

        {/* Alumni */}
        <div className="flex flex-col p-5 mt-4">
          <p className="font-bold text-base text-secondary">Alumni</p>
          <h2 className="text-2xl md:text-4xl font-thin leading-none">
            GatorAI Alumni
          </h2>
        </div>

        <div className="relative w-full py-8 rounded-xl flex items-center justify-center">
          <div className="w-full">
            <Carousel items={alumniCards} />
          </div>
        </div>

        {/* Past Members */}
        <div className="flex flex-col p-5 mt-4">
          <p className="font-bold text-base text-secondary">Past Members</p>
          <h2 className="text-2xl md:text-4xl font-thin leading-none">
            Those who helped build GatorAI
          </h2>
        </div>

        <div className="relative w-full py-4 rounded-xl flex items-center justify-center">
          <div className="w-full">
            <Carousel items={pastCards} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Officers;
