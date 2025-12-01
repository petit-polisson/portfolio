'use client';

import { Project } from '@/types';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-7xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-8 border-b bg-white rounded-t-lg">
          <h2 className="title1">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-3xl font-bold text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

          {/* Contenu */}
          <div className="p-8">
            {/* Image */}
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={900}
              className="w-full h-full object-cover rounded-lg mb-8"
            />
            
  
            {/* Description */}
            <p className="text-content mb-8 leading-relaxed">{project.fullDescription}</p>
  
            {/* Technologies */}
            <div className="mb-8">
              <h3 className="title2 mb-4">Technologies utilisées:</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="project-card-tag"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
  
            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Voir le projet
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
