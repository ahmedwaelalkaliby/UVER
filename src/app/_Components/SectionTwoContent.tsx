"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface ComprehensiveContentAndHeaderProps {
  content: string;
  header: string;
}

export default function ComprehensiveContentAndHeader({
  content,
  header,
}: ComprehensiveContentAndHeaderProps) {
  const container = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current || !contentRef.current) return;

      gsap.from(headerRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.5,
      });
    },
    {
      scope: container,
      dependencies: [content, header],
      revertOnUpdate: true,
    }
  );

  return (
    <div className="space-y-6" ref={container}>
      <h1
        ref={headerRef}
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
      >
        {header}
      </h1>
      <p ref={contentRef} className="text-gray-300 text-xl max-w-lg leading-relaxed">
        {content}
      </p>
    </div>
  );
}
