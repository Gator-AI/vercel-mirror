import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconArrowWaveLeftUp } from "@tabler/icons-react";
import BrowserWindow from "@/components/ui/browser-window";
import { GraduationCap, Wrench } from "lucide-react";
import SebastianLectureImg from "@/images/sebastian-lecturing.png";
import Image from "next/image";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
);

function Involve() {
  const itemsEdu = [
    {
      title: "Develop Skills in AI/ML",
      description: "Workshops led by passionate mentors.",
      header: (
        <div className="w-full h-full overflow-hidden flex items-center justify-center rounded-xl">
          <Image
            src={SebastianLectureImg}
            alt="Lecture"
            className="w-full hover:scale-105"
          />
        </div>
      ),
      className: "md:col-span-1",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Machine Learning Mondays",
      description:
        "Join us for our weekly workshop series that covers a wide range of topics in AI and ML.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Art of Design",
      description: "Discover the beauty of thoughtful and functional design.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Power of Communication",
      description:
        "Understand the impact of effective communication in our lives.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
  ];

  const itemsApplied = [
    {
      title: "BRUH BRUHS",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "HUZ BUSZZD",
      description: "Dive into the transformative power of technology.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "WOOPP",
      description: "Discover the beauty of thoughtful and functional design.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "WEEEEEEE",
      description:
        "Understand the impact of effective communication in our lives.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
  ];

  const tabs = [
    {
      id: "1",
      title: (
        <div className="flex items-center justify-center gap-2">
          <GraduationCap className="w-4 md:w-5" />
          <p className="text-sm md:text-md">Gator Education</p>
        </div>
      ),
      content: (
        <div className="flex flex-col justify-center items-center gap-4">
          {/* <h1 className="text-2xl font-neighbor">
            Gator Education is a place to blah blah
          </h1> */}
          <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
            {itemsEdu.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      ),
    },
    {
      id: "2",
      title: (
        <div className="flex items-center justify-center gap-2">
          <Wrench className="w-4 md:w-5" />
          <p className="text-sm md:text-md">Gator Applied</p>
        </div>
      ),
      content: (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
          {itemsApplied.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      ),
    },
  ];

  return (
    <div className=" min-h-screen w-[90%] md:w-[80%] border-2 my-24 flex flex-col gap-16">
      {/* header */}
      <div className="w-full flex flex-col gap-3">
        <p className="font-neighbor font-bold text-base text-secondary">
          Get Involved
        </p>
        <p className="font-neighbor text-2xl md:text-5xl font-thin leading-none">
          Join a community of students <br></br>enthusiastic about the future of
          AI.
        </p>
        <p className="font-neighbor text-xs max-w-sm md:text-lg md:max-w-xl font-thin text-white/80 leading-snug">
          Our club has two programs to headstart your AI/ML journey. Learn more
          about how to get involved in Gator Education and Gator Applied below.
        </p>
      </div>

      <div>
        <div className="size-full [perspective:1000px] relative flex flex-col  mx-auto  items-start justify-start">
          <BrowserWindow tabs={tabs} />
        </div>
      </div>
    </div>
  );
}

export default Involve;
