import Hero from "@components/Hero";
import "./globals.css";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <Hero />
        <Hero />
        <Hero />
      </div>
    </>
  );
}