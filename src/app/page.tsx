import "./globals.css";
import HomeAnimation from "./components/HomeAnimation";
import Home from "@/components/Home";

export default function Index() {
  return (
    <div className="hidden homeAnim:block">
      <Home />
      <HomeAnimation />
    </div>
  );
}
