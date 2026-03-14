"use client";

import { X } from "react-feather";
import { Button } from "@/components/ui/button";

type DeleteProjectModalProps = {
  projectName: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

export function DeleteProjectModal({
  projectName,
  loading = false,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 backdrop-blur-xl bg-[var(--modal-overlay)]"
        aria-hidden
        onClick={loading ? undefined : onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 z-[60] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl backdrop-blur bg-[var(--modal-bg)]"
        style={{ borderColor: "var(--modal-border)", borderWidth: "1px" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-project-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="mb-5 flex items-center justify-between border-b pb-4"
          style={{ borderColor: "var(--modal-border)" }}
        >
          <h2 id="delete-project-title" className="text-xl font-bold tracking-tight text-foreground">
            Delete project
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-foreground/60 hover:bg-white/10 hover:text-foreground"
            onClick={onClose}
            aria-label="Close"
            disabled={loading}
          >
            <X size={18} />
          </Button>
        </div>

        <p className="text-sm text-foreground/80">
          Are you sure you want to delete
          <span className="font-semibold"> {projectName}</span>?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl border"
            style={{ borderColor: "var(--modal-border)" }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => void onConfirm()}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete project"}
          </Button>
        </div>
      </div>
    </>
  );
}
