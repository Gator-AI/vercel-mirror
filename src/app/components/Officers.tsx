import React from "react";
import { Carousel, FlipCard } from "./ui/apple-cards-carousel";
// import Image from "next/image";
import Manasi from "@/images/officer-photos/manasi.jpg";
import Cathy from "@/images/officer-photos/cathy.jpg";
import Youval from "@/images/officer-photos/youval.jpg";
import Izumi from "@/images/officer-photos/izumi.png";
import Chung from "@/images/officer-photos/chung.png";
import Jim from "@/images/officer-photos/jim.jpeg";
import Sebas from "@/images/officer-photos/sebastian.jpeg";
import Rohan from "@/images/officer-photos/rohan.png";
import Stanley from "@/images/officer-photos/stanley.jpg";
import Patrick from "@/images/officer-photos/patrick.jpg";
import Prajuna from "@/images/officer-photos/prajuna.jpg";
import Misha from "@/images/officer-photos/misha.jpg";
import Nathaniel from "@/images/officer-photos/nathaniel.jpg";
import Giles from "@/images/officer-photos/giles.jpg";
import Sara from "@/images/officer-photos/sara.jpg";
import Jorge from "@/images/officer-photos/jorge.jpg";
import Alejandro from "@/images/officer-photos/alejandro.jpg";
import Rafid from "@/images/officer-photos/rafid.jpg";
// import StanleyImg from "@/images/officer-photos/stanley.jpeg";

const data = [
  {
    category: "President",
    title: "Manasi Patel",
    src: Manasi.src,
    backContent:
      "Don't stress out, everything will work out if you just keep going.",
  },
  {
    category: "Vice President",
    title: "Cathy Quan",
    src: Cathy.src,
    backContent:
      "Doing something imperfectly is better than not doing it at all.",
  },
  {
    category: "Treasurer",
    title: "Prajuna Venkatesan",
    src: Prajuna.src,
    backContent: "A loss is only a loss if you fail to learn from it.",
  },
  {
    category: "Applied Lead",
    title: "Rohan Shah",
    src: Rohan.src,
    backContent: "Never put tinfoil in the microwave.",
  },
  {
    category: "Educational Director",
    title: "Youval Kashuv",
    src: Youval.src,
    backContent: "Learn from other people's failtures but do your own thing.",
  },
  {
    category: "Education Director",
    title: "Jim Su",
    src: Jim.src,
    backContent: "Big world comes with big challenges.",
  },
  {
    category: "Education Director",
    title: "Sebastian Sosa",
    src: Sebas.src,
    backContent: "It always seems impossible until it is done.",
  },
  {
    category: "Co-op Relations Director",
    title: "Giles Greene",
    src: Giles.src,
    backContent: "Invest in yourself.",
  },
  {
    category: "Co-op Relations Director",
    title: "Misha Shah",
    src: Misha.src,
    backContent: "Don't put eggs in the microwave.",
  },
  {
    category: "Co-Webmaster",
    title: "Patrick Lapid",
    src: Patrick.src,
    backContent: "Don't eat with people you wouldn't starve with",
  },
  {
    category: "Co-Webmaster",
    title: "Stanley Ke",
    src: Stanley.src,
    backContent: "If you don't believe in yourself, nobody else will.",
  },
  {
    category: "Co-Social Director",
    title: "Rafid Chowdhury",
    src: Rafid.src,
    backContent: "Happy wife, happy life.",
  },
  {
    category: "Co-Social Director",
    title: "Nathaniel Wubie",
    src: Nathaniel.src,
    backContent:
      "I am not African because I was born in Africa but because Africa was born in me.",
  },

  {
    category: "Graphics Chair",
    title: "Izumi Yasuda",
    src: Izumi.src,
    backContent: "If it makes you happy it's not a waste of time.",
  },
  {
    category: "Secretary",
    title: "Sara Lin",
    src: Sara.src,
    backContent:
      "Don't compare yourself with other people; compare yourself with who you were yesterday.",
  },

  {
    category: "Career Development",
    title: "Chung To",
    src: Chung.src,
    backContent:
      "It's never as easy as you think and it's never as hard as you think.",
  },
  {
    category: "Co-Math Chair",
    title: "Alejandro Leon",
    src: Alejandro.src,
    backContent: "Embrace who you are.",
  },
  {
    category: "Co-Math Chair",
    title: "Jorge Alberto",
    src: Jorge.src,
    backContent: "Proceed as if success is inevitable.",
  },
];

function Officers() {
  const cards = data.map((card, index) => <FlipCard key={index} card={card} />);
  return (
    <div className="min-h-screen mx-auto w-[80%]">
      <div className="size-full flex flex-col items-start justify-center gap-8">
        <div className="flex flex-col gap-0">
          <p className="font-neighbor font-bold text-base text-secondary">
            Board 24-25
          </p>
          <h1 className="font-neighbor text-2xl md:text-5xl font-thin leading-none">
            Meet the officers and mentors!
          </h1>
          <p className="mt-2">Flip the cards to see what they have to say.</p>
        </div>

        <div className="relative w-full py-8 rounded-xl flex items-center justify-center">
          <div className="w-full blur-edges">
            <Carousel items={cards} />
          </div>
        </div>
      </div>
    </div>
  );
}

// const DummyContent = () => {
//   return (
//     <>
//       {[...new Array(3).fill(1)].map((_, index) => {
//         return (
//           <div
//             key={"dummy-content" + index}
//             className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
//           >
//             <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
//               <span className="font-bold text-neutral-700 dark:text-neutral-200">
//                 The first rule of Apple club is that you boast about Apple club.
//               </span>{" "}
//               Keep a journal, quickly jot down a grocery list, and take amazing
//               class notes. Want to convert those notes to text? No problem.
//               Langotiya jeetu ka mara hua yaar is ready to capture every
//               thought.
//             </p>
//             <Image
//               src={StanleyImg}
//               alt="Macbook mockup from Aceternity UI"
//               height="500"
//               width="500"
//               className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
//             />
//           </div>
//         );
//       })}
//     </>
//   );
// };

export default Officers;
