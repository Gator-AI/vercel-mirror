"use client";

import { useState } from "react";
import { Plus } from "react-feather";
import { Button } from "@/components/ui/button";
import { AddLectureModal } from "@/components/AddLectureModal";

export function LecturesEditView() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-5xl font-thin leading-none">Edit lectures</h1>
          <p className="text-foreground/70 mt-2 max-w-2xl">
            Board-only: manage lecture recordings.
          </p>
        </div>
        <Button
          type="button"
          variant="secondaryOutline"
          className="text-sm font-medium shrink-0"
          onClick={() => setAddModalOpen(true)}
        >
          <Plus size={16} className="mr-2 inline-block shrink-0" />
          Add lecture
        </Button>
      </div>

      {addModalOpen && <AddLectureModal onClose={() => setAddModalOpen(false)} />}
    </>
  );
}
