'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SectionOverlay from './SectionOverlay';

export default function PresentationSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollStart = windowHeight;
      const scrollEnd = windowHeight - sectionHeight;
      const progress = Math.max(
        0,
        Math.min(1, (scrollStart - sectionTop) / (scrollStart - scrollEnd))
      );

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Overlay décoratif */}
      <SectionOverlay 
        src="/gif/overlay.gif" 
        alt="Décoration abstraite animée"
        top="-800px"
        left="1550px"
        scale={2}
        rotate={15}
        isGif={true}
      />
      <SectionOverlay 
        src="/gif/overlay1.gif" 
        alt="Décoration abstraite animée"
        top="900px"
        left="-550px"
        scale={1.4}
        rotate={0}
        isGif={true}
      />

      {/* Conteneur principal */}
      <div className="w-full px-12 lg:px-80 relative z-10">
        
        {/* Layout */}
        <div className="flex gap-8 lg:gap-16 items-center">
          
          {/* Image */}
          <div className="w-1/5">
            <div className="image-presentation">
              <Image
                src="/images/presentation-media1.jpg"
                alt="Thomas Branchereau"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="title1">
              Thomas Branchereau
            </h1>

            <h2 className="title2">
              Engineer in Creative Technologies
            </h2>

            <p className="text-content">
              I am a 5th year student in a double degree program in engineering and management at Ecole Supérieure d Ingénierie Léonard de Vinci and Ecole de Management Léonard de Vinci specialised in Creative Technologies.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
