"use client";
import Image from "next/image";
import { IoArrowForward } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { JSX, useRef } from "react";
import { ScrollTrigger, SplitText } from "gsap/all";
import StepsCard from "./StepsCard";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Step {
  title: string;
  description: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    title: "Search for Your Ideal College",
    description:
      "Browse through an extensive database of colleges and universities. Refine your search based on location, majors, campus facilities, and more.",
    icon: "🔍",
  },
  {
    title: "Chat with Admissions Experts",
    description:
      "Ask questions, seek advice, and gain valuable insights to make informed decisions about your college applications.",
    icon: "💬",
  },
  {
    title: "Track Deadlines and Requirements",
    description:
      "Receive notifications for upcoming deadlines, document requirements, and submission dates. Keep track of the progress of your applications.",
    icon: "👁️",
  },
  {
    title: "Apply with Confidence",
    description:
      "Utilize convenient form filling features, upload required documents seamlessly, and submit applications electronically.",
    icon: "📝",
  },
  {
    title: "Plan Your College Future",
    description:
      "Once you receive acceptance letters, utilize UVER's tools to compare offers, evaluate financial aid packages, and make informed decisions.",
    icon: "🏛️",
  },
];


export default function CollegeSteps() {
   const container = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!container.current || !iconRef.current) return;

    ScrollTrigger.refresh();

    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none restart",
      },
    });

    masterTL.from(iconRef.current, { opacity: 0, y: -50, duration: 0.8 }, "first");
    masterTL.from(".howWork", { opacity: 0, y: -50, duration: 0.8 }, "first");
    masterTL.from(".folder", {
      y: gsap.utils.wrap([-50, 50]),
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
    }, "first+=0.3");
  }, { scope: container });
    
  return (
    <section ref={container} className="container mx-auto px-4 py-16">
      <header className="flex justify-between items-center mb-12">
        <div className="howWork flex items-center space-x-2">
          <div className="w-1 h-6 bg-gray-400"></div>
          <span className="text-lg font-semibold text-gray-600">
            How It Works
          </span>
        </div>
        <span ref={iconRef} className="icon text-gray-800 text-3xl">
          🎓 
        </span>
      </header>

      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 space-y-4">
        Simple Steps to <br /> College Success
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 justify-items-center">
              {STEPS.map((step, id) => (
                
            <StepsCard key={id} title={step.title} description={step.description} icon={step.icon} />

        ))}

        <div className="relative rounded-3xl shadow-lg overflow-hidden group">
          <Image
            alt="Students celebrating graduation"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            src="/college.png"
            height={512}
            width={512}
          />
          <div className="absolute inset-0 bg-black/35 flex flex-col justify-end p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Discover, apply, succeed - UVER app makes college search effortless.
            </h2>
            <a
              className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full self-start flex items-center space-x-2 hover:bg-gray-200 transition-colors"
              href="#"
            >
              <span>Get Early Access</span>
              <IoArrowForward />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
