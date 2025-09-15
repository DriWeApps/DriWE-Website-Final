"use client";
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ modelRef }: { modelRef: React.RefObject<THREE.Group> }) {
  const { scene } = useGLTF('/models/car/scene.gltf');

  // This effect runs once after the model has loaded.
  useEffect(() => {
    if (scene) {
      // 1. Create a bounding box to measure the model
      const box = new THREE.Box3().setFromObject(scene);
      // 2. Get the center of the bounding box
      const center = box.getCenter(new THREE.Vector3());
      // 3. Move the model's geometry so its center is at the origin
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.translate(-center.x, -center.y, -center.z);
        }
      });
      // 4. Move the entire scene group back to the original center position
      scene.position.copy(center);
    }
  }, [scene]);

  return <primitive ref={modelRef} object={scene} />;
}

export default function CarScene({ carRef }: { carRef: React.RefObject<THREE.Group> }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas
        camera={{ 
          position: [8, 4, 10], // Pushed the camera even further back
          fov: 50 
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Model modelRef={carRef} />
      </Canvas>
    </div>
  );
}