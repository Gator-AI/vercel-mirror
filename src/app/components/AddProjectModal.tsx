"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "react-feather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addProject } from "@/lib/project-actions";

type AddProjectModalProps = {
  onClose: () => void;
  onAdded?: () => void | Promise<void>;
};

const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

export function AddProjectModal({ onClose, onAdded }: AddProjectModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(DIFFICULTY_OPTIONS[1]);
  const [techStackText, setTechStackText] = useState("");
  const [githubUrl, setGithubUrl] = useState("https://github.com/ufgatorai");
  const [learnMoreUrl, setLearnMoreUrl] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const techStack = techStackText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const result = await addProject({
      name,
      description,
      difficulty,
      tech_stack: techStack,
      github_url: githubUrl,
      learn_more_url: learnMoreUrl,
      image,
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
        aria-labelledby="add-project-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="mb-5 flex items-center justify-between border-b pb-4 sticky top-0 bg-[var(--modal-bg)]"
          style={{ borderColor: "var(--modal-border)" }}
        >
          <h2 id="add-project-title" className="text-xl font-bold tracking-tight text-foreground">
            Add project
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
            <label htmlFor="add-project-name" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Project name
            </label>
            <Input
              id="add-project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. SafeTrip IQ"
              required
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>

          <div>
            <label htmlFor="add-project-description" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Description
            </label>
            <textarea
              id="add-project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the project"
              required
              rows={3}
              className="w-full rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border p-3 text-sm"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>

          <div>
            <label htmlFor="add-project-difficulty" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Difficulty
            </label>
            <select
              id="add-project-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="flex h-10 w-full rounded-xl border bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              style={{ borderColor: "var(--modal-border)" }}
            >
              {DIFFICULTY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="add-project-tech-stack" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Tech stack
            </label>
            <Input
              id="add-project-tech-stack"
              value={techStackText}
              onChange={(e) => setTechStackText(e.target.value)}
              placeholder="Python, FastAPI, React"
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
            <p className="text-xs text-foreground/60 mt-1">Separate technologies with commas.</p>
          </div>

          <div>
            <label htmlFor="add-project-github-url" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              GitHub URL
            </label>
            <Input
              id="add-project-github-url"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/ufgatorai"
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>

          <div>
            <label htmlFor="add-project-learn-more-url" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Learn more URL
            </label>
            <Input
              id="add-project-learn-more-url"
              type="text"
              value={learnMoreUrl}
              onChange={(e) => setLearnMoreUrl(e.target.value)}
              placeholder="/events/gbm1-08-09-25 or https://..."
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>

          <div>
            <label htmlFor="add-project-image" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Image URL or path
            </label>
            <Input
              id="add-project-image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/images/projects/my-project.png or https://..."
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
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
              {loading ? "Adding..." : "Add project"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
