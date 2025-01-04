"use client";

import { useState } from "react";
import tabSvg from "@/images/tab-vector.svg";
import Image from "next/image";

interface Tab {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

interface BrowserWindowProps {
  tabs: Tab[];
}

// const tabs: Tab[] = [
//   { id: "1", title: "Gator Education", content: "Welcome to the home page!" },
//   { id: "2", title: "Gator Applied", content: "This is the about page." },
// ];

export default function BrowserWindow({ tabs }: BrowserWindowProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  return (
    <div className="size-full mx-auto rounded-xl shadow-lg overflow-hidden">
      {/* Tab bar */}
      <div className=" pl-2 pt-3 flex bg-neutral-900">
        <div className="p-2.5 flex items-center">
          <div className="flex space-x-2 mr-4 mb-1">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`w-40 md:w-48 flex items-center justify-start px-4 py-2 font-neighbor font-thin text-sm  ${
              activeTab === tab.id
                ? "bg-neutral-700 rounded-tl-lg rounded-tr-lg -mb-px text-white"
                : "text-white/35 hover:text-white/80"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center space-x-2">
              <span>{tab.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="bg-neutral-700 py-10 h-full overflow-auto text-white">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
