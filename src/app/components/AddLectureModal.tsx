"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "react-feather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addLecture } from "@/lib/lecture-actions";
import { cn } from "@/lib/utils";

const SEMESTERS = ["Spring 2026", "Fall 2025"];
const DEFAULT_SLIDES_URL = "https://drive.google.com/drive/u/0/folders/1i9AagzoFL03bIAlKNrvbg_VodXCS2yYi";

function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

function generateYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

type AddLectureModalProps = {
  onClose: () => void;
  onAdded?: () => void | Promise<void>;
};

export function AddLectureModal({ onClose, onAdded }: AddLectureModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [semester, setSemester] = useState(SEMESTERS[0]);
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLink(url);

    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      setImage(generateYouTubeThumbnail(videoId));
    } else {
      setImage("");
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await addLecture({
      name,
      description,
      date,
      semester,
      link,
      image,
      slides: DEFAULT_SLIDES_URL,
    });

    setLoading(false);
    if (result.ok) {
      if (onAdded) {
        await onAdded();
      }
      onClose();
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 backdrop-blur-xl bg-[var(--modal-overlay)]"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 z-[60] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl backdrop-blur bg-[var(--modal-bg)] max-h-[90vh] overflow-y-auto"
        style={{ borderColor: "var(--modal-border)", borderWidth: "1px" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-lecture-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mb-5 flex items-center justify-between border-b pb-4 sticky top-0 bg-[var(--modal-bg)]"
          style={{ borderColor: "var(--modal-border)" }}
        >
          <h2 id="add-lecture-title" className="text-xl font-bold tracking-tight text-foreground">
            Add lecture
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-foreground/60 hover:bg-white/10 hover:text-foreground"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="add-lecture-name" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Lecture name
            </label>
            <Input
              id="add-lecture-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Introduction to Neural Networks"
              required
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>

          <div>
            <label htmlFor="add-lecture-description" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Description
            </label>
            <textarea
              id="add-lecture-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the lecture content"
              required
              rows={3}
              className="w-full rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border p-3 text-sm"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>

          <div>
            <label htmlFor="add-lecture-date" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Date
            </label>
            <Input
              id="add-lecture-date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. February 2nd, 2026"
              required
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>

          <div>
            <label htmlFor="add-lecture-semester" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Semester
            </label>
            <select
              id="add-lecture-semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className={cn(
                "flex h-10 w-full rounded-xl border bg-background/80 px-3 py-2 text-sm text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              )}
              style={{ borderColor: "var(--modal-border)" }}
            >
              {SEMESTERS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="add-lecture-link" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              YouTube video link
            </label>
            <Input
              id="add-lecture-link"
              type="url"
              value={link}
              onChange={handleLinkChange}
              placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
              required
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
            {link && <p className="text-xs text-foreground/60 mt-1">✓ Thumbnail will be auto-generated</p>}
          </div>

          <div>
            <label htmlFor="add-lecture-image" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Image URL <span className="text-foreground/50 normal-case">(auto-generated from YouTube link)</span>
            </label>
            <Input
              id="add-lecture-image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              disabled
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border opacity-60 cursor-not-allowed"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>

          <div className="rounded-xl border px-4 py-3 text-sm text-foreground/80" style={{ borderColor: "var(--modal-border)" }}>
            All lecture slides are stored in{" "}
            <a
              href={DEFAULT_SLIDES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              this shared folder
            </a>
            .
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl border"
              style={{ borderColor: "var(--modal-border)" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondaryOutline"
              disabled={loading}
              className="text-sm font-medium"
            >
              {loading ? "Adding…" : "Add lecture"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
