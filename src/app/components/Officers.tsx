import React from "react";
import { Carousel, FlipCard } from "./ui/apple-cards-carousel";
// import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BLOB_BASE_URL is not set");
}

const data = [
  {
    category: "President",
    title: "Rohan Shah",
    src: `${baseUrl}/images/officer-photos/rohan.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Vice President",
    title: "Analise Stuart",
    src: `${baseUrl}/images/officer-photos/analise.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Treasurer",
    title: "Sara Lin",
    src: `${baseUrl}/images/officer-photos/sara.jpg`,
    backContent:
      "Don't compare yourself with other people; compare yourself with who you were yesterday.",
  },
  {
    category: "Applied Lead",
    title: "Andy Vu",
    src: `${baseUrl}/images/officer-photos/andy.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Education Director",
    title: "Alvin Wong",
    src: `${baseUrl}/images/officer-photos/alvin.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Secretary",
    title: "Jingtong Zeng",
    src: `${baseUrl}/images/officer-photos/jingtong.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "ML Lecturer",
    title: "Kartik Kathuria",
    src: `${baseUrl}/images/officer-photos/kartik.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "ML Lecturer",
    title: "Sivan Pushpagiri",
    src: `${baseUrl}/images/officer-photos/sivan.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "ML Lecturer",
    title: "Sriniketh Subramanian",
    src: `${baseUrl}/images/officer-photos/sriniketh.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Social Media",
    title: "Kushagra Katiyar",
    src: `${baseUrl}/images/officer-photos/kushagra.jpg`,
    backContent: "Placeholder",
  },

  {
    category: "Corp Relations",
    title: "Misha Shah",
    src: `${baseUrl}/images/officer-photos/misha.jpg`,
    backContent: "Don't put eggs in the microwave.",
  },
  {
    category: "Corp Relations",
    title: "Taher Akolawala",
    src: `${baseUrl}/images/officer-photos/taher.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Social Events",
    title: "Grace Cavaretta",
    src: `${baseUrl}/images/officer-photos/grace.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Social Events",
    title: "Realin Damuth",
    src: `${baseUrl}/images/officer-photos/realin.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Social Events",
    title: "Sarvagna Sangaraju",
    src: `${baseUrl}/images/officer-photos/sarvagna.jpg`,
    backContent: "Placeholder",
  },
  {
    category: "Webmaster",
    title: "Stanley Ke",
    src: `${baseUrl}/images/officer-photos/stanley.jpg`,
    backContent: "If you don't believe in yourself, nobody else will.",
  },
];

function Officers() {
  const cards = data.map((card, index) => <FlipCard key={index} card={card} />);
  return (
    <div
      className="min-h-screen mx-auto w-[400px] md:max-w-full md:w-[80%]"
      id="officers"
    >
      <div className="size-full flex flex-col items-start justify-center gap-8">
        <div className="flex flex-col p-5">
          <p className="font-neighbor font-bold text-base text-secondary">
            Board 25-26
          </p>
          <h1 className="font-neighbor text-2xl md:text-5xl font-thin leading-none">
            Meet the officers and mentors!
          </h1>
          {/* <p className="mt-2 text-white/80">
            Flip the cards to see what they have to say.
          </p> */}
        </div>

        <div className="relative w-full py-8 rounded-xl flex items-center justify-center">
          <div className="w-full">
            <Carousel items={cards} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Officers;
