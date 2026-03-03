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
    linkedin: "https://www.linkedin.com/in/rohanshah004/"
  },
  {
    category: "Vice President",
    title: "Analise Stuart",
    src: `${baseUrl}/images/officer-photos/analise.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/analise-stuart-366425301/"
  },
  {
    category: "Secretary",
    title: "Grace Cavaretta",
    src: `${baseUrl}/images/officer-photos/grace.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/grace-cavarretta/"
  },
  {
    category: "Treasurer",
    title: "Sara Lin",
    src: `${baseUrl}/images/officer-photos/sara.jpg`,
    backContent:
      "Don't compare yourself with other people; compare yourself with who you were yesterday.",
    linkedin: "https://www.linkedin.com/in/linsaraj/"
  },
  {
    category: "Applied Lead",
    title: "Andy Vu",
    src: `${baseUrl}/images/officer-photos/andy.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/adv-andrew-d-vu/"
  },
  {
    category: "Education Director",
    title: "Alvin Wong",
    src: `${baseUrl}/images/officer-photos/alvin.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/alvin-wong-uf/"
  },
  {
    category: "ML Lecturer",
    title: "Kartik Kathuria",
    src: `${baseUrl}/images/officer-photos/kartik.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/kartik-kathuria/"
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
    category: "Web Team & Social Media",
    title: "Kushagra Katiyar",
    src: `${baseUrl}/images/officer-photos/kushagra.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/kushagrakatiyar/"
  },

  {
    category: "Corp Relations",
    title: "Taher Akolawala",
    src: `${baseUrl}/images/officer-photos/taher.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/taher51/"
  },

  {
    category: "Corp Relations",
    title: "Divya Verma",
    src: `${baseUrl}/images/officer-photos/divya.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/divya-verma48/"
  },

  {
    category: "Corp Relations",
    title: "Jackson Jones",
    src: `${baseUrl}/images/officer-photos/jackson.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/jackson-e-jones/"
  },
  {
    category: "Social Events",
    title: "Realin Damuth",
    src: `${baseUrl}/images/officer-photos/realin.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/realin-damuth/"
  },
  {
    category: "Social Events",
    title: "Sarvagna Sangaraju",
    src: `${baseUrl}/images/officer-photos/sarvagna.jpg`,
    backContent: "Placeholder",
    linkedin : "https://www.linkedin.com/in/sarvi-sangaraju/"
  },
  {
    category: "Webmaster",
    title: "Stanley Ke",
    src: `${baseUrl}/images/officer-photos/stanley.jpg`,
    backContent: "If you don't believe in yourself, nobody else will.",
    linkedin: "https://www.linkedin.com/in/stanley-ke/"
  },
  {
    category: "Web Team",
    title: "Jerry Xiao",
    src: `${baseUrl}/images/officer-photos/jerry.jpg`,
    backContent: "Placeholder",
    linkedin: "https://www.linkedin.com/in/yufei-xiao-1a4971329/"
  },
];

function Officers() {
  const cards = data.map((card, index) => <FlipCard key={index} card={card} />);
  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 md:px-10"
      id="officers"
    >
      <div className="size-full flex flex-col items-start justify-center gap-8">
        <div className="flex flex-col p-5">
          <p className="font-bold text-base text-secondary">
            Board 25-26
          </p>
          <h1 className="text-2xl md:text-5xl font-thin leading-none">
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
