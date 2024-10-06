import Navbar from "@components/Navbar";
import Hero from "@components/Hero";

export default function Home() {
  return (
    <div className="container mx-auto ">
      {/* wrapper */}
      <div className="w-full" style={{ backgroundColor: "#0C262A" }}>
        <Navbar></Navbar>
        <Hero></Hero>
      </div>
    </div>
  );
}
