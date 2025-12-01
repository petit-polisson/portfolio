'use client';

import SectionOverlay from './SectionOverlay';

export default function ContactSection() {
  return (
    <section className="contact-section overflow-hidden">
      {/* Overlays décoratifs */}
      <SectionOverlay 
        src="/gif/overlay.gif" 
        alt="Décoration"
        top="3850px"
        left="-900px"
        scale={1.4}
        rotate={-30}
        isGif={true}
      />
      <SectionOverlay 
        src="/gif/overlay1.gif" 
        alt="Décoration"
        top="3200px"
        right="200px"
        scale={1.8}
        rotate={0}
        isGif={true}
      />

      <div className="contact-container relative z-10">
        {/* Titre */}
        <h2 className="title1 text-center mb-16">Get In Touch</h2>

        {/* Contenu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto px-4">
          
          {/* Gauche - Infos */}
          <div className="flex flex-col gap-12">
            {/* Email */}
            <div>
              <h3 className="title2 mb-4">Email</h3>
              <a 
                href="mailto:contact@example.com"
                className="text-content hover:text-[#403f6fcf] transition"
              >
                contact@example.com
              </a>
            </div>

            {/* Localisation */}
            <div>
              <h3 className="title2 mb-4">Location</h3>
              <p className="text-content">Paris, France</p>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="title2 mb-4">Follow me</h3>
              <div className="flex gap-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-content hover:text-[#403f6fcf] transition">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-content hover:text-[#403f6fcf] transition">GitHub</a>
              </div>
            </div>
          </div>

          {/* Droite - CTA */}
          <div className="flex flex-col justify-center">
            <div>
              <h3 className="title2 mb-4">Download my CV</h3>
              <a
                href="/cv/thomas-branchereau-cv.pdf"
                download
                className="btn btn-primary inline-block"
              >
                📄 Download CV
              </a>
              <p className="text-content text-sm mt-4 opacity-70">
                PDF • 2.5 MB
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
