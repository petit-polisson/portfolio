'use client';

import { useRef, useState, useEffect } from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function ProjectsSection({
  projects,
  onProjectClick,
}: ProjectsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll vers la droite
  useEffect(() => {
    if (!isAutoScrolling || !carouselRef.current) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

        // Si on est à la fin, retour au début
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          carouselRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        } else {
          carouselRef.current.scrollBy({
            left: 400,
            behavior: 'smooth',
          });
        }
      }
    }, 1200); // Défile toutes les 1.2 secondes

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Arrête l auto-scroll au scroll manuel
  const handleScroll = () => {
    setIsAutoScrolling(false);

    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    // Reprend l auto-scroll après 1.2 secondes d inactivité
    autoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 1200);
  };

  // Cleanup du timeout
  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="projects-section-full" style={{ backgroundColor: '#ffffff' }}>
      <div className="projects-header">
        <h2 className="title1">My Projects</h2>
      </div>

      {/* Carrousel pleine largeur */}
      <div
        className="projects-carousel-container-full"
        ref={carouselRef}
        onScroll={handleScroll}
      >
        <div className="projects-carousel-full">
          {projects.map((project) => (
            <div key={project.id} className="projects-carousel-item-full">
              <ProjectCard
                project={project}
                onClick={() => onProjectClick(project)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
