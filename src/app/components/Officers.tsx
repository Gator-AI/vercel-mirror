import React from "react";
import { Carousel, FlipCard } from "./ui/apple-cards-carousel";
// import Image from "next/image";

import Rohan from "@/images/officer-photos/rohan.png";
import Analise from "@/images/officer-photos/analise.jpg";
import Sara from "@/images/officer-photos/sara.jpg";
import Andy from "@/images/officer-photos/andy.jpg";
import Alvin from "@/images/officer-photos/alvin.jpg";
import Jingtong from "@/images/officer-photos/jingtong.jpg";
import Misha from "@/images/officer-photos/misha.jpg";
import Kartik from "@/images/officer-photos/kartik.jpg";
import Sivan from "@/images/officer-photos/sivan.jpg";
import Sriniketh from "@/images/officer-photos/sriniketh.jpg";
import Kushagra from "@/images/officer-photos/kushagra.jpg";
import Taher from "@/images/officer-photos/taher.jpg";
import Grace from "@/images/officer-photos/grace.jpg";
import Realin from "@/images/officer-photos/realin.jpg";
import Sarvagna from "@/images/officer-photos/sarvagna.jpg";
import Stanley from "@/images/officer-photos/stanley.jpg";

const data = [
  {
    category: "President",
    title: "Rohan Shah",
    src: Rohan.src,
    backContent: "Placeholder",
  },
  {
    category: "Vice President",
    title: "Analise Stuart",
    src: Analise.src,
    backContent: "Placeholder",
  },
  {
    category: "Treasurer",
    title: "Sara Lin",
    src: Sara.src,
    backContent:
      "Don't compare yourself with other people; compare yourself with who you were yesterday.",
  },
  {
    category: "Applied Lead",
    title: "Andy Vu",
    src: Andy.src,
    backContent: "Placeholder",
  },
  {
    category: "Education Director",
    title: "Alvin Wong",
    src: Alvin.src,
    backContent: "Placeholder",
  },
  {
    category: "Secretary",
    title: "Jingtong Zeng",
    src: Jingtong.src,
    backContent: "Placeholder",
  },
  {
    category: "ML Lecturer",
    title: "Kartik Kathuria",
    src: Kartik.src,
    backContent: "Placeholder",
  },
  {
    category: "ML Lecturer",
    title: "Sivan Pushpagiri",
    src: Sivan.src,
    backContent: "Placeholder",
  },
  {
    category: "ML Lecturer",
    title: "Sriniketh Subramanian",
    src: Sriniketh.src,
    backContent: "Placeholder",
  },
  {
    category: "Social Media",
    title: "Kushagra Katiyar",
    src: Kushagra.src,
    backContent: "Placeholder",
  },

  {
    category: "Corp Relations",
    title: "Misha Shah",
    src: Misha.src,
    backContent: "Don't put eggs in the microwave.",
  },
  {
    category: "Corp Relations",
    title: "Taher Akolawala",
    src: Taher.src,
    backContent: "Placeholder",
  },
  {
    category: "Social Events",
    title: "Grace Cavaretta",
    src: Grace.src,
    backContent: "Placeholder",
  },
  {
    category: "Social Events",
    title: "Realin Damuth",
    src: Realin.src,
    backContent: "Placeholder",
  },
  {
    category: "Social Events",
    title: "Sarvagna Sangaraju",
    src: Sarvagna.src,
    backContent: "Placeholder",
  },
  {
    category: "Webmaster",
    title: "Stanley Ke",
    src: Stanley.src,
    backContent: "If you don't believe in yourself, nobody else will.",
  },
];

function Officers() {
  const cards = data.map((card, index) => <FlipCard key={index} card={card} />);
  return (
    <div className="min-h-screen mx-auto w-[80%]" id="officers">
      <div className="size-full flex flex-col items-start justify-center gap-8">
        <div className="flex flex-col">
          <p className="font-neighbor font-bold text-base text-secondary">
            Board 25-26
          </p>
          <h1 className="font-neighbor text-2xl  md:text-5xl font-thin leading-none">
            Meet the officers and mentors!
          </h1>
          <p className="mt-2 text-white/80">
            Flip the cards to see what they have to say.
          </p>
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
