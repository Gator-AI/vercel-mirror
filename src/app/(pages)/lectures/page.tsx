"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Plus } from "react-feather";
import ShimmerButton from "@/components/ui/shimmer-button";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { AddLectureModal } from "@/components/AddLectureModal";
import { DeleteLectureModal } from "@/components/DeleteLectureModal";
import { deleteLecture } from "@/lib/lecture-actions";

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

const SEMESTERS = ["All semesters", "Spring 2026", "Fall 2025"];

function Projects() {
  const [query, setQuery] = React.useState("");
  const [semester, setSemester] = React.useState(SEMESTERS[1]);
  const [videos, setVideos] = React.useState<Lecture[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const semesterOptions = SEMESTERS;
  const [authStatus, setAuthStatus] = React.useState({
    isBoardMember: false,
    isAuthenticated: false,
  });
  const [checkingBoardStatus, setCheckingBoardStatus] = React.useState(true);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [accessError, setAccessError] = React.useState("");
  const [deleteError, setDeleteError] = React.useState("");
  const [deletingLectureKey, setDeletingLectureKey] = React.useState<string | null>(null);
  const [lectureToDelete, setLectureToDelete] = React.useState<Lecture | null>(null);

  const fetchLectures = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("lectures")
        .select("*")
        .order("date", { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const lecturesData = (data || []) as Lecture[];

      const parseTextDate = (dateStr: string): Date => {
        const monthNames: { [key: string]: number } = {
          january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
          july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
        };

        const parts = dateStr.toLowerCase().split(/\s+/);
        const month = monthNames[parts[0]] ?? 0;
        const day = parseInt(parts[1], 10) || 1;
        const year = parseInt(parts[2], 10) || 2026;

        return new Date(year, month, day);
      };

      const sortedLectures = lecturesData.sort((a, b) => {
        const dateA = parseTextDate(a.date).getTime();
        const dateB = parseTextDate(b.date).getTime();
        return dateB - dateA;
      });

      setVideos(sortedLectures);
    } catch (err) {
      console.error("Error fetching lectures:", err);
      setError(err instanceof Error ? err.message : "Failed to load lectures");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  useEffect(() => {
    let isMounted = true;

    async function fetchBoardStatus() {
      try {
        const response = await fetch("/api/auth/board-status", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch board status");
        }
        const data = await response.json();
        if (isMounted) {
          setAuthStatus({
            isBoardMember: Boolean(data?.isBoardMember),
            isAuthenticated: Boolean(data?.isAuthenticated),
          });
        }
      } catch (fetchError) {
        console.error("Error checking board status:", fetchError);
        if (isMounted) {
          setAuthStatus({ isBoardMember: false, isAuthenticated: false });
        }
      } finally {
        if (isMounted) {
          setCheckingBoardStatus(false);
        }
      }
    }

    fetchBoardStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddLectureClick = React.useCallback(() => {
    if (checkingBoardStatus) return;

    if (!authStatus.isAuthenticated) {
      window.location.href = "/login?next=/lectures";
      return;
    }

    if (!authStatus.isBoardMember) {
      setAccessError("Only board members can add lectures.");
      return;
    }

    setAccessError("");
    setAddModalOpen(true);
  }, [authStatus, checkingBoardStatus]);

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

  const handleDeleteLectureRequest = React.useCallback(
    (lecture: Lecture) => {

      if (!authStatus.isBoardMember) {
        setDeleteError("Only board members can delete lectures.");
        return;
      }

      setLectureToDelete(lecture);
    },
    [authStatus.isBoardMember]
  );

  const confirmDeleteLecture = React.useCallback(async () => {
    if (!lectureToDelete) return;
    const lectureKey =
      lectureToDelete.id ??
      `${lectureToDelete.name}-${lectureToDelete.date}-${lectureToDelete.link}`;

      setDeleteError("");
      setDeletingLectureKey(lectureKey);

      try {
        const result = await deleteLecture({
          id: lectureToDelete.id,
          name: lectureToDelete.name,
          date: lectureToDelete.date,
          semester: lectureToDelete.semester,
          link: lectureToDelete.link,
        });
        if (!result.ok) {
          setDeleteError(result.error);
          return;
        }

        await fetchLectures();
        setLectureToDelete(null);
      } catch (deleteErr) {
        console.error("Failed to delete lecture:", deleteErr);
        setDeleteError("Failed to delete lecture. Please try again.");
      } finally {
        setDeletingLectureKey(null);
      }
    },
    [fetchLectures, lectureToDelete]
  );

  if (loading) {
    return (
      <div className="my-32 min-h-screen w-screen flex items-center justify-center">
        <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-center justify-center gap-8">
          <p className="text-white/80">Loading lectures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-32 min-h-screen w-screen flex items-center justify-center">
        <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-center justify-center gap-8">
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-32 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-start justify-start gap-8">
        {deleteError && (
          <div className="w-full rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-200">
            {deleteError}
          </div>
        )}
        <div className="flex flex-col items-start justify-start w-full">
          <div className="mb-4 flex items-start justify-between gap-4 w-full flex-wrap">
            <div>
              <h1 className="text-2xl md:text-5xl font-thin leading-none">
                Lecture Recordings
              </h1>
              <p className="font-neigbor mt-4 text-white/80 text-xl">
                Explore our latest lecture series on AI and machine learning.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button
                type="button"
                variant="secondaryOutline"
                className="shrink-0 text-sm font-medium"
                onClick={handleAddLectureClick}
                disabled={checkingBoardStatus}
              >
                <Plus size={16} className="mr-2 inline-block" />
                Add lecture
              </Button>
              {accessError && (
                <p className="text-xs text-red-300 text-right max-w-[220px]">
                  {accessError}
                </p>
              )}
            </div>
          </div>
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
          </div>
        </div>
        {filteredVideos.length === 0 ? (
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
                key={video.id ?? video.name}
                className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="w-full aspect-video overflow-hidden rounded-lg bg-white/20 mb-4">
                  <Image
                    src={
                      video.image.includes("maxresdefault")
                        ? video.image.replace("maxresdefault.jpg", "hqdefault.jpg")
                        : video.image
                    }
                    alt={video.name + " image"}
                    width={640}
                    height={360}
                    className="object-cover w-full h-full"
                    priority={false}
                    unoptimized
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
                <div className="flex w-full flex-wrap gap-4 mt-auto">
                  <a href={video.link} target="_blank" rel="noopener noreferrer">
                    <ShimmerButton
                      borderRadius="10px"
                      background="#00272b"
                      className="py-2 px-8  text-base font-light w-fit shadow-md"
                    >
                      View on YouTube
                    </ShimmerButton>
                  </a>
                  <a href={video.slides} target="_blank" rel="noopener noreferrer">
                    <ShimmerButton
                      borderRadius="10px"
                      background="#00272b"
                      className="py-2 px-8  text-base font-light w-fit shadow-md"
                    >
                      Go to slides
                    </ShimmerButton>
                  </a>
                  {authStatus.isBoardMember && (
                    <ShimmerButton
                      type="button"
                      borderRadius="10px"
                      background="#00272b"
                      className="py-2 px-8  text-base font-light w-fit shadow-md"
                      onClick={() => handleDeleteLectureRequest(video)}
                      disabled={deletingLectureKey === (video.id ?? `${video.name}-${video.date}-${video.link}`)}
                    >
                      {deletingLectureKey === (video.id ?? `${video.name}-${video.date}-${video.link}`)
                        ? "Deleting..."
                        : "Delete lecture"}
                    </ShimmerButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
      {addModalOpen && authStatus.isBoardMember && (
        <AddLectureModal
          onClose={() => setAddModalOpen(false)}
          onAdded={fetchLectures}
        />
      )}
      {lectureToDelete && (
        <DeleteLectureModal
          lectureName={lectureToDelete.name}
          loading={deletingLectureKey !== null}
          onClose={() => {
            if (!deletingLectureKey) {
              setLectureToDelete(null);
            }
          }}
          onConfirm={confirmDeleteLecture}
        />
      )}
    </>
  );
}

export default Projects;
