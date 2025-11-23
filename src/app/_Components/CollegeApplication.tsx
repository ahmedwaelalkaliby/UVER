'use client'
import React, { useEffect, useRef } from 'react'
import ScreensCard from './ScreensCard';
import { IoArrowForward } from 'react-icons/io5';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CollegeApplication() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%", // Animation starts when top of element hits 80% of viewport
          end: "bottom 20%",
          toggleActions: "play none none reverse" // play on enter, reverse on leave
        }
      }
    );
  }, []);

  return (
    <section className="container mx-auto min-h-screen">
      {/* Header Section */}
     <header ref={headerRef} className="text-center my-10">
        <h1 className="text-3xl font-bold text-gray-800">
             Simplify your college application journey with UVER. <br/>
              Discover, apply, and succeed in just a few easy steps. <br />
              Unlock endless possibilities for your future.
        </h1>
     </header>
     
          {/* Main Content */}
 <section className=" container mx-auto p-5 grid grid-cols-1 lg:grid-cols-5 gap-8 my-20">
  {/* screens grid section - takes 3 columns on large screens */}
  <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
    <ScreensCard />
    <ScreensCard />
    <ScreensCard />
    <ScreensCard />
  </div>

  {/* single screen section - takes 2 columns on large screens */}
<div className="group relative w-full lg:col-span-2 h-[300px] sm:h-[300px] md:h-[400px] lg:h-[950px] rounded-3xl shadow-lg overflow-hidden">
  {/* Background image with hover scale - wrapped in its own container */}
  <div className="absolute inset-0 overflow-hidden rounded-3xl">
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
      style={{ 
        backgroundImage: "url('/graduation.png')",
        opacity: 0.6
      }}
    />
  </div>
  
  {/* Dark overlay for better text readability */}
  <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
  
  {/* Content */}
  <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 text-white">
    {/* Icon at top */}
    <div className="text-4xl sm:text-5xl">🎓</div>
    
    {/* Text and button at bottom */}
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        Get ready to experience the future of college applications with UVER
      </h2>
      
      {/* Arrow button */}
      <a  href="#" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white flex items-center justify-center hover:scale-110 transition-transform duration-300">
        <span></span>
        <IoArrowForward />
      </a>
    </div>
  </div>
</div>
</section> 
    </section>
  )
}