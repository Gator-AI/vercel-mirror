"use client";
import React from "react";
import EventsGallery from "@/components/EventsGallery";

function Events() {
  return (
    <div className="my-24 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[80%] h-full flex flex-col items-start justify-start gap-4">
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-neighbor text-2xl  md:text-5xl font-thin leading-none">
            Events
          </h1>
          <p className="mt-2 font-bold text-white/80">
            See the latest events happening at GatorAI
          </p>
        </div>
        <EventsGallery />
      </div>
    </div>
  );
}

export default Events;
