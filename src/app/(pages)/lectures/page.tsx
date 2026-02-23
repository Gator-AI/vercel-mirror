"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import ShimmerButton from "@/components/ui/shimmer-button";
import { SearchBar } from "@/components/ui/search-bar";
import { createClient } from "@/lib/supabase/client";
// import { Youtube } from "react-feather";

const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BLOB_BASE_URL is not set");
}

interface Lecture {
  id?: string;
  name: string;
  description: string;
  date: string;
  semester: string;
  link: string;
  image: string;
  slides: string;
}

// Keep latest semester at index 1
const SEMESTERS = ["All semesters", "Spring 2026", "Fall 2025"];

function Projects() {
  const [query, setQuery] = React.useState("");
  const [semester, setSemester] = React.useState(SEMESTERS[1]);
  const [videos, setVideos] = React.useState<Lecture[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const semesterOptions = SEMESTERS;

  // Fetch lectures from Supabase
  useEffect(() => {
    async function fetchLectures() {
      try {
        setLoading(true);
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("lectures")
          .select("*")
          .order("date", { ascending: false });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        const lecturesData = (data || []) as Lecture[];
        
        // Parse text dates like "February 2nd, 2026" and sort by date from latest to oldest
        const parseTextDate = (dateStr: string): Date => {
          const monthNames: { [key: string]: number } = {
            january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
            july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
          };
          
          const parts = dateStr.toLowerCase().split(/\s+/);
          const month = monthNames[parts[0]] ?? 0;
          const day = parseInt(parts[1]) || 1; // Remove ordinal suffixes
          const year = parseInt(parts[2]) || 2026;
          
          return new Date(year, month, day);
        };
        
        const sortedLectures = lecturesData.sort((a, b) => {
          const dateA = parseTextDate(a.date).getTime();
          const dateB = parseTextDate(b.date).getTime();
          return dateB - dateA; // Latest first
        });
        
        setVideos(sortedLectures);
      } catch (err) {
        console.error("Error fetching lectures:", err);
        setError(err instanceof Error ? err.message : "Failed to load lectures");
      } finally {
        setLoading(false);
      }
    }

    fetchLectures();
  }, []);

  const filteredVideos = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return videos.filter((video) => {
      if (semester !== "All semesters" && video.semester !== semester) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        video.name,
        video.description,
        video.date,
        video.semester,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query, semester, videos]);

  return (
    <div className="my-32 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-start justify-start w-full">
          <h1 className="text-2xl md:text-5xl font-thin leading-none">
            Lecture Recordings
          </h1>
          <p className="font-neigbor mt-4 text-white/80 text-xl">
            Explore our latest lecture series on AI and machine learning.
          </p>
          <div className="mt-8 flex flex-col items-stretch w-full gap-4 md:flex-row md:items-center">
            <SearchBar
              placeholder="Search recordings..."
              value={query}
              onChange={setQuery}
              inputRef={searchInputRef}
              className="w-full md:flex-1 md:min-w-[320px]"
              inputClassName="font-neigbor"
            />
            <label className="w-full md:w-56 md:shrink-0">
              <span className="sr-only">Filter by semester</span>
              <select
                value={semester}
                onChange={(event) => setSemester(event.target.value)}
                className="w-full rounded-md border border-white/40 bg-white/5 px-3 py-2 text-white font-neigbor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {semesterOptions.map((option) => (
                  <option key={option} value={option} className="text-black">
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {/* <div className="bg-red-500 px-2 py-1 rounded-md hover:scale-105 flex items-center justify-center">
              <Youtube />
            </div> */}
          </div>
        </div>
        {loading ? (
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/80">
            <p>Loading lectures...</p>
          </div>
        ) : error ? (
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/80">
            <p>Error loading lectures: {error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 text-sm text-white underline decoration-white/40 underline-offset-4 hover:text-white/90"
            >
              Try again
            </button>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/80">
            <p>No recordings match your search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                searchInputRef.current?.focus();
              }}
              className="mt-3 text-sm text-white underline decoration-white/40 underline-offset-4 hover:text-white/90"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredVideos.map((video) => (
              <div
                key={video.name}
                className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="w-full h-50 bg-white/20 rounded mb-2 flex items-center justify-center">
                  <Image
                    src={`${baseUrl}${video.image}`}
                    alt={video.name + " image"}
                    width={320}
                    height={160}
                    className="object-cover w-full h-full"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    priority={false}
                  />
                </div>
                <h2 className="text-xl md:text-2xl text-white mb-2">
                  {video.name}
                </h2>
                <p className="text-sm text-white/80 mb-2">
                  {video.description}
                </p>
                <p className="text-base font-bold text-white/80 mb-4">
                  {video.date}
                </p>
                <div className="flex w-full gap-4 mt-auto">
                  <a href={video.link} target="_blank">
                    <ShimmerButton
                      borderRadius="10px"
                      background="#00272b"
                      className="py-2 px-8  text-base font-light w-fit shadow-md"
                    >
                      View on YouTube
                    </ShimmerButton>
                  </a>
                  <a href={video.slides} target="_blank">
                    <ShimmerButton
                      borderRadius="10px"
                      background="#00272b"
                      className="py-2 px-8  text-base font-light w-fit shadow-md"
                    >
                      Go to slides
                    </ShimmerButton>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
