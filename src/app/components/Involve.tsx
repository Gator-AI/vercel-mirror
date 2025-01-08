import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import AnimatedChangingCards from "@/components/ui/animated-changing-cards";
import { IconArrowWaveLeftUp } from "@tabler/icons-react";
import BrowserWindow from "@/components/ui/browser-window";
import { GraduationCap, Wrench, CalendarDays } from "lucide-react";
import SebastianLectureImg from "@/images/sebastian-lecturing.png";

import Image from "next/image";
import ShimmerButton from "./ui/shimmer-button";
import { Lens } from "@/components/ui/lens";
import { AnimatedList } from "@/components/ui/animated-list";
import { Notification } from "@/components/ui/notification";
import { useOnScreen } from "./hooks/useOnScreen";
import { useEffect, useState, useRef } from "react";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
);

function Involve() {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // needed for lens tracking
  const [hovering, setHovering] = useState(false);

  // check if animatedlist is within view if so then animate

  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);
  const [listHovering, setListHovering] = useState(false);

  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  let notifications = [
    {
      name: "GatorAI",
      description: "Don't forget to come to the workshop Monday!",
      time: "15m ago",

      icon: "G",
      color: "#00C9A7",
    },
    {
      name: "President",
      description: "The workshop is at TURL007.",
      time: "9m ago",

      icon: "P",
      color: "#e68cc6",
    },
    {
      name: "Jeff the Land Shark",
      description: "Chomp chomp chomp...",
      time: "8m ago",

      icon: "🦈",
      color: "#7fbdf0",
    },
    {
      name: "Stanley",
      description: "sup!",
      time: "0.002m ago",

      icon: "S",
      color: "#7ff07f",
    },
  ];

  const itemsEdu = [
    {
      title: "Develop Skills in AI/ML",
      description: "Workshops led by passionate mentors",
      header: (
        <div className="w-full h-full overflow-hidden items-center justify-center rounded-xl bg-dot-white/[0.2] flex flex-col gap-4">
          <div className="mx-auto w-[90%] relative">
            <Lens hovering={hovering} setHovering={setHovering}>
              <Image
                src={SebastianLectureImg}
                alt="Lecture"
                className="w-full rounded-lg hover:cursor-none"
              />
            </Lens>
          </div>
        </div>
      ),
      className: "md:col-span-1",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: (
        <div
          onMouseEnter={() => setListHovering(true)}
          onMouseLeave={() => setListHovering(false)}
        >
          <p>Machine Learning Mondays</p>
        </div>
      ),
      description: (
        <div
          className="flex w-full backdrop-blur-xl"
          onMouseEnter={() => setListHovering(true)}
          onMouseLeave={() => setListHovering(false)}
        >
          <p>
            Join us for our weekly workshop series that covers a wide range of
            topics in AI and ML.<br></br> Check our calendar for upcoming
            events!
          </p>
          <ShimmerButton className="ml-auto px-3 py-2" shimmerDuration="2.5s">
            <CalendarDays className="w-4" />
          </ShimmerButton>
        </div>
      ),
      header: (
        <div
          className="w-full h-full overflow-hidden flex items-center justify-center rounded-lg bg-dot-white/[0.2]"
          ref={elementRef}
          onMouseEnter={() => setListHovering(true)}
          onMouseLeave={() => setListHovering(false)}
        >
          {/* <Image src={AiWorkshopImg} alt="Ai workshop" className="w-full" /> */}
          <AnimatedList listHovering={listHovering}>
            {notifications.map((item, idx) => (
              <Notification {...item} key={idx} />
            ))}
          </AnimatedList>
        </div>
      ),
      className: "md:col-span-2",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Code along in the Jupyter Notebook",
      description:
        "Get hands-on experience with machine learning models and visualize your data.",
      header: (
        <div className="w-full h-full overflow-hidden flex items-center justify-center rounded-lg">
          {isHydrated ? (
            <video
              src="/videos/jupyter-notebook-demo.mp4"
              loop={true} // change this back to true later
              autoPlay
              muted
              className="rounded-md"
            ></video>
          ) : (
            <Skeleton />
          )}
        </div>
      ),
      className: "md:col-span-2",
      icon: <IconArrowWaveLeftUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Career Connections",
      description:
        "Get to know industry professionals and alumni at our special guest events.",
      header: (
        <div className="w-full h-full overflow-hidden flex items-center justify-center rounded-lg bg-dot-white/[0.2]">
          <AnimatedChangingCards testimonials={testimonials} autoplay={true} />
        </div>
      ),
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
          <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[30rem]">
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
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
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
    <div className=" min-h-screen w-[90%] md:w-[80%] my-24 flex flex-col gap-16">
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
        <div className="h-full w-full [perspective:1000px] relative flex flex-col  mx-auto  items-start justify-start">
          <BrowserWindow tabs={tabs} />
        </div>
      </div>
    </div>
  );
}

export default Involve;
