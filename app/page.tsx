'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { projects } from '@/data/projects';
import Navbar from '@/components/NavBar';
import PresentationSection from '@/components/PresentationSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ProjectModal from '@/components/ProjectModal';
import Intersections from '@/components/InterSections';
import ThreeScene from '@/components/ThreeScene';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <ThreeScene />

      <main>
        <section id="presentation">
          <PresentationSection />
        </section>
        <Intersections />

        <section id="projets">
          <ProjectsSection 
            projects={projects}
            onProjectClick={handleProjectClick}
          />
        </section>
        <Intersections />

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {isModalOpen && selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
