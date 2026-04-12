"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const BASS_MODEL = "/models/bass/bass.glb";
const TEXTURES = {
  albedo: "/models/bass/stripedbass_albedo.png",
  alpha: "/models/bass/stripedbass_alpha.png",
  normal: "/models/bass/stripedbass_normal.png",
  roughness: "/models/bass/stripedbass_rough.png",
};

useGLTF.preload(BASS_MODEL);

function LoadingBass({
  startDelay,
  y,
  z,
  fishScale,
  speed,
  direction,
  opacity,
}: {
  startDelay: number;
  y: number;
  z: number;
  fishScale: number;
  speed: number;
  direction: number;
  opacity: number;
}) {
  const { scene } = useGLTF(BASS_MODEL);
  const groupRef = useRef<THREE.Group>(null);

  const [albedo, alpha, normal, roughness] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const textures = [
      loader.load(TEXTURES.albedo),
      loader.load(TEXTURES.alpha),
      loader.load(TEXTURES.normal),
      loader.load(TEXTURES.roughness),
    ];
    textures.forEach((t) => { t.flipY = false; });
    textures[0].colorSpace = THREE.SRGBColorSpace;
    return textures;
  }, []);

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: albedo, alphaMap: alpha, normalMap: normal, roughnessMap: roughness,
          roughness: 0.6, metalness: 0.1, envMapIntensity: 1.0,
          transparent: true, alphaTest: 0.1, side: THREE.DoubleSide, opacity,
        });
        child.geometry.computeVertexNormals();
      }
    });
    return cloned;
  }, [scene, albedo, alpha, normal, roughness, opacity]);

  const s = 6.5 * fishScale;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = Math.max(0, state.clock.elapsedTime - startDelay);
    if (t <= 0) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Swim across — dramatic entrance
    const swimX = t * speed * 1.2;
    const range = 20;
    const x = direction > 0
      ? -range / 2 + (swimX % range)
      : range / 2 - (swimX % range);

    groupRef.current.position.x = x;
    groupRef.current.position.y = y + Math.sin(t * 0.8) * 0.15;

    // Tail flick — more aggressive during loading
    groupRef.current.rotation.z = Math.sin(t * 2.5) * 0.04;
  });

  const faceDirection = direction > 0 ? Math.PI / 2 : -Math.PI / 2;

  return (
    <group ref={groupRef} position={[0, y, z]}>
      <primitive
        object={clonedScene}
        scale={[s, s, s]}
        rotation={[0, faceDirection, 0]}
      />
    </group>
  );
}

export default function LoadingBassScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* Dramatic lighting for the loading screen */}
        <ambientLight intensity={0.25} color="#a0b8ac" />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#e4f0e8" />
        <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#6a9e82" />
        {/* Strong green rim for drama */}
        <pointLight position={[0, 0, -5]} intensity={4} color="#4a9e7e" distance={12} decay={2} />
        <pointLight position={[3, -1, 3]} intensity={1} color="#5ab88e" distance={10} decay={2} />
        <pointLight position={[-3, 1, 3]} intensity={0.8} color="#3a8a6a" distance={10} decay={2} />
        <Environment preset="night" environmentIntensity={0.4} />

        {/* HERO — big bass swimming right across center */}
        <LoadingBass startDelay={0.2} y={0} z={0} fishScale={1.3} speed={1} direction={1} opacity={1} />

        {/* Second bass swimming left, slightly above */}
        <LoadingBass startDelay={0.6} y={0.6} z={-2} fishScale={0.9} speed={0.8} direction={-1} opacity={0.7} />

        {/* Third bass, smaller, below */}
        <LoadingBass startDelay={1} y={-0.7} z={-1.5} fishScale={0.7} speed={1.1} direction={1} opacity={0.6} />

        {/* Background school appearing over time */}
        <LoadingBass startDelay={1.2} y={1.2} z={-4} fishScale={0.4} speed={0.7} direction={-1} opacity={0.35} />
        <LoadingBass startDelay={1.5} y={-1.3} z={-5} fishScale={0.35} speed={0.6} direction={1} opacity={0.3} />
        <LoadingBass startDelay={1.8} y={0.3} z={-6} fishScale={0.3} speed={0.9} direction={-1} opacity={0.25} />
        <LoadingBass startDelay={2} y={-0.5} z={-7} fishScale={0.25} speed={0.5} direction={1} opacity={0.2} />
      </Suspense>
    </Canvas>
  );
}
