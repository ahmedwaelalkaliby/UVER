"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileMockup from "./MobileMockup";

gsap.registerPlugin(ScrollTrigger);

// Countdown hook
const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return {
    days: Math.floor(countDown / (1000 * 60 * 60 * 24)),
    hours: Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)),
  };
};

export default function TheFirstSection() {
  const { days, hours, minutes } = useCountdown("2025-12-31T00:00:00");

  const phoneRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 3D phone interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = -(e.clientY / innerHeight - 0.5) * 20;
      gsap.to(phoneRef.current, {
        rotateY: x,
        rotateX: y,
        transformPerspective: 600,
        ease: "power1.out",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate section elements
  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".animate");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full flex justify-center items-center py-10"
      >
      <div className="max-w-7xl w-full flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:items-center">

        {/* LEFT TEXT */}
        <div className="flex flex-col max-w-sm text-center lg:text-left animate">
          <p className="text-2xl leading-relaxed">
            Discover, apply, succeed – UVER makes college search effortless.
            Your future starts right here.
          </p>

          <div className="mt-6">
            <p className="text-2xl mb-2">⏳ Launching starts in</p>
            <div className="flex justify-center lg:justify-start gap-3 text-4xl font-semibold">
              <span>{days}</span> : <span>{hours}</span> : <span>{minutes}</span>
            </div>
            <p className="text-xs mt-1">days  hours  minutes</p>
          </div>
        </div>

        {/* PHONE MOCKUP */}
        <div ref={phoneRef} className="will-change-transform animate">
          <MobileMockup />
        </div>

        {/* RIGHT ICON LIST */}
        <div className="flex flex-col gap-4 text-2xl text-center lg:text-left animate">
          <p>🔍 SEARCH</p>
          <p>💬 CHAT</p>
          <p>📄 APPLY</p>
          <p>👀 TRACK</p>
        </div>
          </div>
          
          {/* background text */}
        <div className="absolute -bottom-30  left-1/2 tracking-[15rem] -translate-x-1/2 text-gray-200 text-[300px] font-extrabold -z-10 select-none">
        UVER
      </div>
    </section>
  );
}
