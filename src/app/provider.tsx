"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

interface GSAPProviderProps {
  children: React.ReactNode;
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  return <>{children}</>;
}

export default GSAPProvider;
