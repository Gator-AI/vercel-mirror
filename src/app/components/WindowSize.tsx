import React, { useState, useEffect } from "react";

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function WindowSizeComponent() {
  const { width, height } = useWindowDimensions();

  return (
    <div className="fixed top-0">
      <p>
        Width: {width}px, Height: {height}px
      </p>
    </div>
  );
}

export default WindowSizeComponent;
