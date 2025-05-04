import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import cardModel from './assets/card.glb';

const CARD_PATH = cardModel;

function LanyardModel() {
  const { scene } = useGLTF(CARD_PATH);
  return <primitive object={scene} />;
}

const Lanyard: React.FC<{ position?: any; gravity?: any }> = () => {
  return (
    <div style={{ width: 320, height: 320, position: 'relative', zIndex: 1, background: '#181929', border: '2px solid #444', borderRadius: 16 }} className="relative">
      <Canvas camera={{ position: [0, 0, 20], fov: 35 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={0.7} />
        <Suspense fallback={
          <mesh>
            <planeGeometry args={[4, 4]} />
            <meshStandardMaterial color="#f87171" />
          </mesh>
        }>
          <LanyardModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={true} />
      </Canvas>
      <div className="absolute bottom-2 left-0 w-full text-center pointer-events-none">
        <span className="text-stellar-400 font-bold text-base drop-shadow">Tasavvuf Gori</span>
      </div>
    </div>
  );
};

export default Lanyard;

// Required for GLTF loading
// @ts-ignore
useGLTF.preload && useGLTF.preload(CARD_PATH);
