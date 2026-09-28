import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCyberCore: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Main Wireframe Geometry (Icosahedron with inner Torus)
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeo, wireframeMat);
    scene.add(icosahedron);

    // Inner Glowing Core
    const innerGeo = new THREE.OctahedronGeometry(0.9, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerCore);

    // Outer Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Floating Particles Constellation
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2.5;
      targetY = y * 2.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Click Shockwave Burst
    const handleClick = () => {
      wireframeMat.opacity = 1.0;
      icosahedron.scale.set(1.15, 1.15, 1.15);
      setTimeout(() => {
        wireframeMat.opacity = 0.6;
        icosahedron.scale.set(1, 1, 1);
      }, 300);
    };

    currentMount.addEventListener('click', handleClick);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotations
      icosahedron.rotation.x = elapsedTime * 0.2 + mouseY;
      icosahedron.rotation.y = elapsedTime * 0.3 + mouseX;

      innerCore.rotation.x = -elapsedTime * 0.4 - mouseY;
      innerCore.rotation.y = -elapsedTime * 0.5 - mouseX;

      ring.rotation.z = elapsedTime * 0.15;
      ring.rotation.y = elapsedTime * 0.1 + mouseX * 0.5;

      particles.rotation.y = elapsedTime * 0.05 + mouseX * 0.2;
      particles.rotation.x = elapsedTime * 0.03 + mouseY * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeEventListener('click', handleClick);
      }
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] sm:min-h-[480px] cursor-grab active:cursor-grabbing relative"
    />
  );
};
