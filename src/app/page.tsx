"use client";
import "./globals.css";
import Home from "@/components/Home";
import About from "@/components/About";
import Involve from "@/components/Involve";
import Officers from "@/components/Officers";
import FAQPage from "@/components/FAQ";

export default function Index() {

  return (
    <div className="overflow-x-hidden">
      <Home />
      <About />
      <Involve />
      <Officers />
      <FAQPage />

    </div>
  );
}
