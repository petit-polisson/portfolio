'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boatRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene et caméra
    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const frustumHeight = window.innerHeight * 0.9;
    const frustumWidth = window.innerWidth;

    const camera = new THREE.OrthographicCamera(
      -frustumWidth / 2,
      frustumWidth / 2,
      frustumHeight / 2,
      -frustumHeight / 2,
      1,
      1000
    );
    camera.position.set(200, 400, 0);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    scene.background = null;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Event listeners
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = event.clientX - window.innerWidth / 2;
      mouseRef.current.y = window.innerHeight / 2 - event.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Charger le modèle
    const loader = new GLTFLoader();
    loader.load(
      '/models/result2.gltf',
      (gltf) => {
        boatRef.current = gltf.scene;
        boatRef.current.scale.set(1.8, 1.8, 1.8);
        scene.add(boatRef.current);
        boatRef.current.position.set(0, 0, 0);
        boatRef.current.rotation.y = 1.5 * Math.PI;
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
      (error) => console.error('Erreur lors du chargement :', error)
    );

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (boatRef.current) {
        const { x, y, prevX, prevY } = mouseRef.current;
        boatRef.current.position.x += (-y - boatRef.current.position.x) * 0.1;
        boatRef.current.position.z += (-x - boatRef.current.position.z) * 0.1;

        const dx = x - prevX;
        const dz = prevY - y;
        if (dx !== 0 || dz !== 0) {
          boatRef.current.rotation.y = Math.atan2(dx, dz);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
