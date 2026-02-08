"use client";

import { useEffect, useState } from "react";
import Preloader from "./Preloader";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onFinish={() => setIsLoaded(true)} />
      <div
        className={`transition-all duration-1000 ease-out transform ${
          isLoaded
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-0 translate-y-10 blur-sm pointer-events-none"
        }`}
      >
        {children}
      </div>
    </>
  );
}
