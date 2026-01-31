import React from "react";
import { motion } from "framer-motion";
// import trailMixSocial from "@/images/events-photos/trail-mix-social.jpg";
// import gbm2 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025.jpg";
// import gbm1 from "@/images/events-photos/gbm1-photos/GBM1-Fall-2025.jpg";
// import mlMonday1 from "@/images/events-photos/ml-monday-1.jpg";
// import hyperGator from "@/images/events-photos/hypergator-tour.jpg";
// import bakeSale from "@/images/events-photos/bake-sale.png";
import Link from "next/link";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BLOB_BASE_URL is not set");
}

// Data for the gallery items (these will link to their respective pages with a short description of the activity)
const items = [
  {
    text: "Trail Mix Social",
    type: "default",
    image: "https://placehold.co/320x180",
    slug: "trail-mix-social",
  },
  {
    text: "General Body Meeting 1 - 08/09/2025",
    type: "large",
    image: `${baseUrl}/images/event-photos/gbm1-photos-fall-2025/GBM1-Fall-2025.jpg`,
    slug: "gbm1-08-09-25",
  },
  {
    text: "HyperGator Tour",
    type: "default",
    image: "https://placehold.co/320x180",
    slug: "hypergator-tour",
  },
  {
    text: "General Body Meeting 2 - 10/22/2025",
    type: "large",
    image: `${baseUrl}/images/event-photos/gbm2-photos-fall-2025/GBM-2-Fall-2025.jpg`,
    slug: "gbm2-10-22-25",
  },

  {
    text: "GatorAI Bake Sale",
    type: "large",
    image: "https://placehold.co/320x180",
    slug: "bake-sale",
  },
  {
    text: "ML Monday 1 - 09/15/2025",
    type: "default",
    image: `${baseUrl}/images/ml-monday-1.jpg`,
    slug: "ml-monday-1",
  },
];

const getItemClasses = (type: string) => {
  switch (type) {
    case "medium":
      return "row-span-3";
    case "large":
      return "row-span-3";
    case "full":
      return "row-span-1 md:col-span-full md:row-span-2";
    default:
      return "row-span-2";
  }
};

const containerVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

const overlayVariants = {
  rest: { opacity: 0.3 },
  hover: { opacity: 0 },
};

const EventsGallery = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div
        className="grid gap-[30px] w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gridAutoRows: "150px",
          gridAutoFlow: "row dense",
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={containerVariants}
            initial="rest"
            whileHover="hover"
            className={`relative flex flex-col justify-end shadow-lg cursor-pointer ${getItemClasses(
              item.type
            )}`}
            style={{ borderRadius: "8px", overflow: "hidden" }}
          >
            <Image
              src={item.image}
              alt={item.text}
              fill
              style={{ objectFit: "cover" }}
            />

            <motion.div
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black pointer-events-none"
            />

            <div className="relative z-10 p-4 bg-white text-gray-500 text-sm tracking-wide">
              <p className="">{item.text}</p>
            </div>

            <Link
              href={`/events/${item.slug}`}
              className="absolute inset-0 z-20"
              aria-label={item.text}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventsGallery;
