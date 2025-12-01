'use client';

import Image from 'next/image';

interface SectionOverlayProps {
  src: string;
  alt: string;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  opacity?: number;
  isGif?: boolean;
  scale?: number;
  rotate?: number;
}

export default function SectionOverlay({
  src,
  alt,
  top,
  right,
  bottom,
  left,
  opacity = 1,
  isGif = false,
  scale = 1,
  rotate = 0,
}: SectionOverlayProps) {
  return (
    <div 
      className="section-overlay"
      style={{ 
        opacity,
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: 'top left',
      }}
    >
      {isGif ? (
        <img 
          src={src} 
          alt={alt}
          style={{ width: 'auto', height: 'auto' }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: 'auto' }}
        />
      )}
    </div>
  );
}
