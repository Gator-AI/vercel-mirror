import Navbar from "@components/Navbar";
import Hero from "@components/Hero";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Hero />
      </div>
    </>
  );
}