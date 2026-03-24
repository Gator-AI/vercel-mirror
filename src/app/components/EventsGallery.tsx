import React from "react";
import { AnimatePresence, motion } from "framer-motion";
// import trailMixSocial from "@/images/events-photos/trail-mix-social.jpg";
// import gbm2 from "@/images/events-photos/gbm2-photos/GBM-2-Fall-2025.jpg";
// import gbm1 from "@/images/events-photos/gbm1-photos/GBM1-Fall-2025.jpg";
// import mlMonday1 from "@/images/events-photos/ml-monday-1.jpg";
// import hyperGator from "@/images/events-photos/hypergator-tour.jpg";
// import bakeSale from "@/images/events-photos/bake-sale.png";
import Link from "next/link";
import Image from "next/image";

type TimelineItem = {
  title: string;
  dateLabel: string;
  date?: string;
  description: string;
  image: string;
  slug: string;
};

const getFileName = (url: string, fallback: string) => {
  try {
    const parsedUrl = new URL(url);
    const lastSegment = parsedUrl.pathname.split("/").pop();
    if (lastSegment && lastSegment.includes(".")) {
      return decodeURIComponent(lastSegment);
    }
  } catch {
  }

  return `${fallback}.jpg`;
};

const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BLOB_BASE_URL is not set");
}

// Data for the timeline entries.
const timelineItems: TimelineItem[] = [
  {
    title: "Trail Mix Social",
    dateLabel: "Community Social",
    description:
      "A relaxed social meetup where members connected, shared project ideas, and welcomed new faces.",
    image: "https://placehold.co/320x180",
    slug: "trail-mix-social",
  },
  {
    title: "General Body Meeting 1",
    dateLabel: "Aug 9, 2025",
    date: "2025-08-09",
    description:
      "Kickoff session for the semester featuring announcements, tracks, and opportunities to get involved.",
    image: `${baseUrl}/images/event-photos/gbm1-photos-fall-2025/GBM1-Fall-2025.jpg`,
    slug: "gbm1-08-09-25",
  },
  {
    title: "HyperGator Tour",
    dateLabel: "Technical Visit",
    description:
      "Members explored campus compute resources and learned practical tips for scaling ML workflows.",
    image: "https://placehold.co/320x180",
    slug: "hypergator-tour",
  },
  {
    title: "General Body Meeting 2",
    dateLabel: "Oct 22, 2025",
    date: "2025-10-22",
    description:
      "Mid-semester updates and community highlights with demos from ongoing student initiatives.",
    image: `${baseUrl}/images/event-photos/gbm2-photos-fall-2025/GBM-2-Fall-2025.jpg`,
    slug: "gbm2-10-22-25",
  },

  {
    title: "GatorAI Bake Sale",
    dateLabel: "Fundraiser",
    description:
      "A community fundraiser supporting club activities and new learning events for members.",
    image: "https://placehold.co/320x180",
    slug: "bake-sale",
  },
  {
    title: "ML Monday 1",
    dateLabel: "Sep 15, 2025",
    date: "2025-09-15",
    description:
      "Hands-on intro session focused on practical ML workflows, tooling, and beginner-friendly projects.",
    image: `${baseUrl}/images/ml-monday-1.jpg`,
    slug: "ml-monday-1",
  },
];

const containerVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

const overlayVariants = {
  rest: { opacity: 0.3 },
  hover: { opacity: 0 },
};

const panelVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  expanded: { opacity: 1, height: "auto", marginTop: 16 },
};

const triggerImageDownload = async (
  event: React.MouseEvent<HTMLButtonElement>,
  imageUrl: string,
  fileName: string
) => {
  event.preventDefault();
  event.stopPropagation();

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    return;
  } catch {
  }

  const fallbackLink = document.createElement("a");
  fallbackLink.href = imageUrl;
  fallbackLink.download = fileName;
  document.body.appendChild(fallbackLink);
  fallbackLink.click();
  fallbackLink.remove();
};

const EventsGallery = () => {
  const sortedItems = React.useMemo(() => {
    const datedItems = timelineItems.filter((item) => Boolean(item.date));
    const undatedItems = timelineItems.filter((item) => !item.date);

    datedItems.sort((a, b) => {
      const first = new Date(a.date as string).getTime();
      const second = new Date(b.date as string).getTime();
      return second - first;
    });

    return [...datedItems, ...undatedItems];
  }, []);

  const [activeSlug, setActiveSlug] = React.useState(sortedItems[0]?.slug ?? "");

  return (
    <div className="w-full">
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#6fffe4]/15 via-[#6fffe4]/70 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-4 md:space-y-6">
          {sortedItems.map((item, index) => {
            const isActive = activeSlug === item.slug;
            const isEven = index % 2 === 0;

            return (
              <div key={item.slug} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveSlug(item.slug)}
                  className="group w-full text-left"
                >
                  <div className="grid grid-cols-[48px_1fr] gap-4 md:grid-cols-[1fr_56px_1fr] md:gap-8">
                    <div className={`${isEven ? "md:block" : "md:hidden"} hidden`} />

                    <div className="relative flex items-start justify-center">
                      <motion.span
                        initial={false}
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          boxShadow: isActive
                            ? "0 0 0 8px rgba(111,255,228,0.15)"
                            : "0 0 0 0 rgba(111,255,228,0)",
                        }}
                        transition={{ duration: 0.2 }}
                        className={`mt-3 block h-4 w-4 rounded-full border ${
                          isActive
                            ? "border-[#6fffe4] bg-[#6fffe4]"
                            : "border-[#6fffe4]/70 bg-[#00252c]"
                        }`}
                      />
                    </div>

                    <motion.div
                      variants={containerVariants}
                      initial="rest"
                      whileHover="hover"
                      className={`rounded-xl border px-4 py-3 md:px-5 md:py-4 ${
                        isActive
                          ? "border-[#6fffe4]/70 bg-[#001f25] ring-2 ring-[#6fffe4]/55 shadow-[0_0_0_1px_rgba(111,255,228,0.25)]"
                          : "border-white/10 bg-white/[0.03]"
                      } ${isEven ? "md:col-start-3" : "md:col-start-1"}`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-[#6fffe4]/45 bg-[#6fffe4]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#90ffe9]">
                          {item.dateLabel}
                        </span>
                        {isActive ? (
                          <span className="text-xs uppercase tracking-[0.12em] text-white/65">
                            Open
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                        {item.title}
                      </h3>

                      <div className="mt-3 grid items-start gap-3 md:grid-cols-[1fr_200px]">
                        <p className="max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                          {item.description}
                        </p>

                        <div className="relative overflow-hidden rounded-lg border border-white/20 bg-black/30">
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={item.image}
                              alt={`${item.title} preview`}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      key={`${item.slug}-panel`}
                      variants={panelVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden pl-[64px] md:pl-0"
                    >
                      <div className="md:grid md:grid-cols-[1fr_56px_1fr]">
                        <div className={`${isEven ? "md:col-start-3" : "md:col-start-1"}`}>
                          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/30">
                            <div className="relative aspect-[16/9] w-full">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                style={{ objectFit: "cover" }}
                              />

                              <motion.div
                                variants={overlayVariants}
                                initial="rest"
                                whileHover="hover"
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-black/25 pointer-events-none"
                              />

                              <button
                                type="button"
                                onClick={(event) =>
                                  triggerImageDownload(
                                    event,
                                    item.image,
                                    getFileName(item.image, item.slug)
                                  )
                                }
                                className="absolute right-3 top-3 z-20 rounded-md border border-white/25 bg-black/55 p-2 text-white hover:bg-black/75"
                                aria-label={`Download ${item.title} image`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                >
                                  <path d="M12 3v12" />
                                  <path d="m7 10 5 5 5-5" />
                                  <path d="M5 21h14" />
                                </svg>
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-5">
                              <p className="text-sm text-white/70">View full photo collection</p>
                              <Link
                                href={`/events/${item.slug}`}
                                className="rounded-full border border-[#6fffe4]/55 bg-[#6fffe4]/10 px-4 py-2 text-sm font-semibold text-[#a0fff0] transition hover:bg-[#6fffe4]/20"
                                aria-label={`Open ${item.title}`}
                              >
                                Open Event
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsGallery;
