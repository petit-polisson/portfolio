'use client';

import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-image">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="project-card-content">
        <h3 className="title2">{project.title}</h3>
        <p className="text-content mb-16">{project.shortDescription}</p>
        <div className="project-card-tags">
          {project.techStack.map((tech) => (
            <span key={tech} className="project-card-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
