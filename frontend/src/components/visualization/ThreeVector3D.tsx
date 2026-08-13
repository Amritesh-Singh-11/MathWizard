import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VectorItem {
  name: string;
  coords: number[];
  color?: string;
}

interface ThreeVector3DProps {
  vectors: VectorItem[];
}

export const ThreeVector3D: React.FC<ThreeVector3DProps> = ({ vectors }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = 280;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090d16');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(8, 8, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Grid & Axes Helpers
    const gridHelper = new THREE.GridHelper(10, 10, '#334155', '#1e293b');
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Draw Vector Arrows
    vectors.forEach((v) => {
      const dir = new THREE.Vector3(...(v.coords || [1, 1, 1])).normalize();
      const origin = new THREE.Vector3(0, 0, 0);
      const length = Math.sqrt((v.coords[0]||0)**2 + (v.coords[1]||0)**2 + (v.coords[2]||0)**2) || 3;
      const color = v.color || '#00f2fe';
      const arrowHelper = new THREE.ArrowHelper(dir, origin, length, color, 0.4, 0.2);
      scene.add(arrowHelper);
    });

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      scene.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [vectors]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
      <div ref={mountRef} className="w-full h-[280px]" />
      <div className="absolute bottom-2 left-3 flex items-center space-x-3 text-[11px] font-mono bg-slate-900/90 px-3 py-1 rounded border border-slate-800">
        <span className="text-slate-400">3D Vector Field Orbit:</span>
        {vectors.map((v, i) => (
          <span key={i} style={{ color: v.color || '#00f2fe' }}>
            {v.name}: [{v.coords.join(', ')}]
          </span>
        ))}
      </div>
    </div>
  );
};
