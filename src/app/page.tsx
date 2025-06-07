"use client";
import { Home } from "./components/HomePage";

const HomePage = () => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      style={{ background: "#0f0f0f" }}
    >
      <Home />
    </div>
  );
};

export default HomePage;
