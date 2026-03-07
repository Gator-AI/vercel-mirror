"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "react-feather";
import { Button } from "@/components/ui/button";
import { AddLectureModal } from "@/components/AddLectureModal";
import { DeleteLectureModal } from "@/components/DeleteLectureModal";
import { createClient } from "@/lib/supabase/client";
import { deleteLecture } from "@/lib/lecture-actions";

export type Lecture = {
  id?: string;
  name: string;
  description: string;
  date: string;
  semester: string;
  link: string;
  image: string;
  slides: string | null;
};

type LecturesEditViewProps = {
  initialLectures: Lecture[];
};

export function LecturesEditView({ initialLectures }: LecturesEditViewProps) {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [lectures, setLectures] = useState(initialLectures);
  const [fetching, setFetching] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingLectureKey, setDeletingLectureKey] = useState<string | null>(null);
  const [lectureToDelete, setLectureToDelete] = useState<Lecture | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    setLectures(initialLectures);
  }, [initialLectures]);

  const fetchLectures = useCallback(async () => {
    setFetching(true);
    setLoadError(null);

    try {
      const { data, error } = await supabase
        .from("lectures")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        throw error;
      }

      setLectures((data ?? []) as Lecture[]);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load lectures. Please try again.";
      setLoadError(message);
    } finally {
      setFetching(false);
    }
  }, [supabase]);

  useEffect(() => {
    void fetchLectures();
  }, [fetchLectures]);

  const handleDeleteRequest = useCallback((lecture: Lecture) => {
    setLectureToDelete(lecture);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!lectureToDelete) return;
    const lectureKey =
      lectureToDelete.id ?? `${lectureToDelete.name}-${lectureToDelete.date}-${lectureToDelete.link}`;

    setDeletingLectureKey(lectureKey);
    setDeleteError(null);

    const result = await deleteLecture({
      id: lectureToDelete.id,
      name: lectureToDelete.name,
      date: lectureToDelete.date,
      semester: lectureToDelete.semester,
      link: lectureToDelete.link,
    });
    if (!result.ok) {
      setDeleteError(result.error);
      setDeletingLectureKey(null);
      return;
    }

    await fetchLectures();
    setLectureToDelete(null);
    setDeletingLectureKey(null);
    router.refresh();
  }, [fetchLectures, lectureToDelete, router]);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-5xl font-thin leading-none">Edit lectures</h1>
          <p className="text-foreground/70 mt-2 max-w-2xl">
            Board-only: manage lecture recordings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondaryOutline"
            className="text-sm font-medium shrink-0"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus size={16} className="mr-2 inline-block shrink-0" />
            Add lecture
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-foreground/70 hover:text-foreground"
            onClick={fetchLectures}
            disabled={fetching}
          >
            {fetching ? "Refreshing…" : "Refresh"}
          </Button>
        </div>
      </div>

      {loadError && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-200">
          {loadError}
        </div>
      )}

      {deleteError && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-200">
          {deleteError}
        </div>
      )}

      {fetching && lectures.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-sm text-foreground/70">
          Loading lectures…
        </div>
      ) : lectures.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-sm text-foreground/70">
          No lectures found yet. Add your first recording to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lectures.map((lecture) => (
            <article
              key={lecture.id ?? `${lecture.name}-${lecture.date}-${lecture.link}`}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-4 w-full overflow-hidden rounded-xl border border-white/10 bg-white/10">
                {lecture.image ? (
                  <Image
                    src={lecture.image}
                    alt={`${lecture.name} thumbnail`}
                    width={640}
                    height={360}
                    className="h-48 w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center text-sm text-foreground/50">
                    No thumbnail
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-widest text-foreground/60">
                  {lecture.semester} · {lecture.date}
                </p>
                <h2 className="text-xl font-semibold text-foreground">
                  {lecture.name}
                </h2>
                <p className="text-sm text-foreground/70 line-clamp-3">
                  {lecture.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {lecture.link && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={lecture.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch video
                        </a>
                      </Button>
                    )}
                    {lecture.slides && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={lecture.slides}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View slides
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => handleDeleteRequest(lecture)}
                  disabled={
                    deletingLectureKey ===
                    (lecture.id ?? `${lecture.name}-${lecture.date}-${lecture.link}`)
                  }
                >
                  <Trash2 size={14} />
                  {deletingLectureKey ===
                  (lecture.id ?? `${lecture.name}-${lecture.date}-${lecture.link}`)
                    ? "Deleting..."
                    : "Delete lecture"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {addModalOpen && (
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
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
