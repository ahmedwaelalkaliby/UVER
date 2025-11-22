"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { MdOutlineMouse } from "react-icons/md";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import MobileMockup from "./MobileMockup";
import SectionTwoContent from "./SectionTwoContent";

gsap.registerPlugin(Observer, ScrollSmoother, ScrollTrigger, SplitText, ScrollToPlugin);

interface NavItem {
  id: number;
  label: string;
  header: string;
  content: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: "College Search",
    header: "Comprehensive College Search",
    content:
      "Effortlessly explore a vast database of colleges and universities worldwide. Filter results based on your preferences, including location, majors, campus facilities, and more. Find the perfect fit for your educational journey.",
  },
  {
    id: 2,
    label: "Recommendations",
    header: "Personalized Advising",
    content:
      "Stay organized with an intuitive application tracker. Monitor the progress of your applications, track deadlines, and receive reminders to submit required documents. Never miss an important milestone on your path to higher education.",
  },
  {
    id: 3,
    label: "Tracker",
    header: "Application Tracker",
    content:
      "Receive tailored recommendations based on your interests, academic achievements, and career aspirations. Discover colleges and programs that align with your goals, ensuring you make informed decisions about your future.",
  },
  {
    id: 4,
    label: "Chat",
    header: "Engaging Experts Chat",
    content:
      "Feel free to inquire, seek counsel, and acquire valuable perspectives to assist you in making well-informed choices regarding your college applications. Receive tailored guidance and assistance every step of the way.",
  },
  {
    id: 5,
    label: "Application",
    header: "Seamless Application",
    content:
      "Submit applications directly through the app. Save time by completing and submitting forms electronically. Enjoy a hassle-free application process with streamlined document uploads and easy communication with admissions offices.",
  },
];

export default function TheSecondSection() {
  const container = useRef<HTMLDivElement | null>(null);
  const mockupRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<Observer | null>(null);
  const [activeSection, setActiveSection] = useState<number>(1);
  const isScrolling = useRef(false);

  const changeSection = useCallback((direction: "up" | "down") => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    setActiveSection((prev) => {
      const newSection =
        direction === "down"
          ? Math.min(prev + 1, NAV_ITEMS.length)
          : Math.max(prev - 1, 1);

      setTimeout(() => {
        isScrolling.current = false;
      }, 600);

      return newSection;
    });
  }, []);

  useGSAP(
    () => {
      // Kill previous observer
      if (observerRef.current) observerRef.current.kill();

      // Scroll observer
      if (container.current) {
        observerRef.current = Observer.create({
          type: "wheel,scroll,touch",
          target: container.current,
          tolerance: 10,
          onUp: () => changeSection("up"),
          onDown: () => changeSection("down"),
        });
      }

      // Mouse indicator bounce
      gsap.to(".mouse-indicator", {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      });

      // Animate header and content
      const headerEl = document.querySelector(".section-header");
      const contentEl = document.querySelector(".section-content");

      if (headerEl && contentEl) {
        const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });
        tl.fromTo(headerEl, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }).fromTo(
          contentEl,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0 },
          "-=0.5"
        );
      }

      // Animate nav highlight
      gsap.to("nav p", {
        color: (i, target) =>
          target.classList.contains("active") ? "#fff" : "#9ca3af",
        duration: 0.5,
        ease: "power1.out",
      });

      return () => {
        if (observerRef.current) observerRef.current.kill();
      };
    },
    {
      scope: container,
      dependencies: [activeSection],
      revertOnUpdate: true,
    }
  );

  // Animate MobileMockup to interact with mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mockupRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 30; 
      const y = (e.clientY / window.innerHeight - 0.5) * 30; 

      gsap.to(mockupRef.current, {
        rotationY: x,
        rotationX: -y,
        transformPerspective: 600,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={container} className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-10 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center lg:justify-between lg:items-center ">
          {/* Left Panel */}
          <div className="flex flex-col space-y-12">
            <nav className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <p
                  key={item.id}
                  className={`pl-4 border-l-2 transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-white text-2xl font-semibold border-blue-500 active"
                      : "text-gray-400 text-2xl hover:text-white border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.id);
                  }}
                >
                  {item.label}
                </p>
              ))}
            </nav>

            <SectionTwoContent
              content={NAV_ITEMS[activeSection - 1].content}
              header={NAV_ITEMS[activeSection - 1].header}
            />

            <div className="flex items-center text-neutral-500">
              <MdOutlineMouse className="mouse-indicator mr-2" size={24} />
            </div>
          </div>

          {/* Right Panel (Mobile Mockup) */}
          <div ref={mockupRef}>
            <MobileMockup {...({ activeSection } as any)} />
          </div>
        </div>
      </div>
    </section>
  );
}
