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

let sharedMaterial: THREE.MeshStandardMaterial | null = null;

function useBassMaterial() {
  return useMemo(() => {
    if (sharedMaterial) return sharedMaterial;
    const loader = new THREE.TextureLoader();
    const albedo = loader.load(TEXTURES.albedo);
    const alpha = loader.load(TEXTURES.alpha);
    const normal = loader.load(TEXTURES.normal);
    const roughness = loader.load(TEXTURES.roughness);
    [albedo, alpha, normal, roughness].forEach((t) => { t.flipY = false; });
    albedo.colorSpace = THREE.SRGBColorSpace;
    sharedMaterial = new THREE.MeshStandardMaterial({
      map: albedo, alphaMap: alpha, normalMap: normal, roughnessMap: roughness,
      roughness: 0.65, metalness: 0.1, envMapIntensity: 0.8,
      transparent: true, alphaTest: 0.1, side: THREE.DoubleSide,
    });
    return sharedMaterial;
  }, []);
}

function SwimmingBass({
  y,
  z,
  fishScale = 1,
  speed = 1,
  direction = 1, // 1 = swimming right, -1 = swimming left
  fishOpacity = 1,
  yDrift = 0.15,
}: {
  y: number;
  z: number;
  fishScale?: number;
  speed?: number;
  direction?: number;
  fishOpacity?: number;
  yDrift?: number;
}) {
  const { scene } = useGLTF(BASS_MODEL);
  const bassMaterial = useBassMaterial();
  const groupRef = useRef<THREE.Group>(null);
  const timeOffset = useRef(Math.random() * 200);

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = bassMaterial.clone();
        mat.opacity = fishOpacity;
        child.material = mat;
        child.geometry.computeVertexNormals();
      }
    });
    return cloned;
  }, [scene, bassMaterial, fishOpacity]);

  // OBJ is ~0.41 long; scale to make fish visible
  const s = 6.5 * fishScale;
  // Viewport is ~12 units wide at z=0. Range = 30 so wrap happens ~9 units offscreen each side.
  const range = 30;
  // Fade only the outer 4 units so fish are fully visible across the viewport
  const fadeZone = 4;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + timeOffset.current;

    // Calm horizontal swim
    const rawX = (t * speed * 0.35) % range;
    const x = direction > 0
      ? -range / 2 + rawX
      : range / 2 - rawX;

    groupRef.current.position.x = x;
    groupRef.current.position.y = y + Math.sin(t * 0.3 * speed) * yDrift;

    // Fade at the very edges only — just to prevent the hard snap on wrap
    const absX = Math.abs(x);
    const halfRange = range / 2;
    let edgeOpacity = 1;
    if (absX > halfRange - fadeZone) {
      edgeOpacity = Math.max(0, (halfRange - absX) / fadeZone);
    }

    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = fishOpacity * edgeOpacity;
      }
    });

    // Very subtle body undulation
    groupRef.current.rotation.z = Math.sin(t * speed * 0.8) * 0.015;
  });

  // The OBJ model's nose points along -Z.
  // To swim RIGHT: rotate Y by +PI/2 (nose points +X)
  // To swim LEFT:  rotate Y by -PI/2 (nose points -X)
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

// Generate a school of fish spread vertically across the full page height
function generateSchool() {
  // Fish from top (y=6) to far bottom (y=-30) so you see new fish as you scroll
  // The camera is at z=10, so fish at z=0 are closest, z=-12 are far
  // Calm speeds but VISIBLE opacity — fish should be clearly seen
  const fish = [
    // === TOP OF PAGE (hero area) ===
    { y: 2.5, z: -1, fishScale: 0.9, speed: 0.25, direction: 1, fishOpacity: 0.9, yDrift: 0.08 },
    { y: 0.5, z: -1.5, fishScale: 0.7, speed: 0.2, direction: -1, fishOpacity: 0.85, yDrift: 0.1 },
    { y: -1, z: -3, fishScale: 0.5, speed: 0.3, direction: 1, fishOpacity: 0.7, yDrift: 0.1 },
    { y: 1.5, z: -2, fishScale: 0.55, speed: 0.22, direction: -1, fishOpacity: 0.75, yDrift: 0.08 },
    { y: -0.5, z: -4, fishScale: 0.4, speed: 0.18, direction: 1, fishOpacity: 0.5, yDrift: 0.1 },

    // === MIDDLE (reads / explore sections) ===
    { y: -4, z: -1, fishScale: 0.8, speed: 0.22, direction: -1, fishOpacity: 0.85, yDrift: 0.08 },
    { y: -5.5, z: -2, fishScale: 0.6, speed: 0.28, direction: 1, fishOpacity: 0.7, yDrift: 0.1 },
    { y: -3.5, z: -3.5, fishScale: 0.45, speed: 0.2, direction: -1, fishOpacity: 0.55, yDrift: 0.1 },
    { y: -6.5, z: -1.5, fishScale: 0.7, speed: 0.18, direction: 1, fishOpacity: 0.8, yDrift: 0.08 },

    // === LOWER (writing / contact sections) ===
    { y: -9, z: -1, fishScale: 0.85, speed: 0.22, direction: 1, fishOpacity: 0.85, yDrift: 0.08 },
    { y: -10.5, z: -2, fishScale: 0.6, speed: 0.25, direction: -1, fishOpacity: 0.7, yDrift: 0.1 },
    { y: -11.5, z: -1.5, fishScale: 0.65, speed: 0.2, direction: 1, fishOpacity: 0.75, yDrift: 0.08 },
    { y: -13, z: -3, fishScale: 0.45, speed: 0.28, direction: -1, fishOpacity: 0.55, yDrift: 0.1 },

    // === DEEP (if they scroll way down) ===
    { y: -15, z: -1.5, fishScale: 0.75, speed: 0.22, direction: -1, fishOpacity: 0.8, yDrift: 0.08 },
    { y: -17, z: -2.5, fishScale: 0.55, speed: 0.25, direction: 1, fishOpacity: 0.65, yDrift: 0.1 },
    { y: -16, z: -1, fishScale: 0.65, speed: 0.18, direction: 1, fishOpacity: 0.8, yDrift: 0.08 },
    { y: -19, z: -3.5, fishScale: 0.4, speed: 0.2, direction: -1, fishOpacity: 0.5, yDrift: 0.1 },
    { y: -18, z: -2, fishScale: 0.7, speed: 0.22, direction: -1, fishOpacity: 0.75, yDrift: 0.08 },
  ];
  return fish;
}

// Camera that follows scroll position
function ScrollCamera() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Map scroll position to camera Y. As user scrolls down, camera moves down.
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = maxScroll > 0 ? scrollY / maxScroll : 0;
    // Total vertical range of fish is about y=3 to y=-19 = 22 units
    const targetY = 1 - scrollRatio * 22;
    // Lerp for smooth following
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;
  });

  return <group ref={groupRef} />;
}

export default function BassScene({ className = "" }: { className?: string }) {
  const school = useMemo(() => generateSchool(), []);

  return (
    <div className={className} style={{ touchAction: "pan-y" }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} color="#b0c4b8" />
          <directionalLight position={[6, 4, 5]} intensity={1.0} color="#e0ece4" />
          <directionalLight position={[-5, 2, -3]} intensity={0.3} color="#7a9e8e" />
          <pointLight position={[0, 1, -6]} intensity={2} color="#4a9e7e" distance={15} decay={2} />
          <pointLight position={[0, -3, 0]} intensity={0.2} color="#3a5a4a" distance={10} decay={2} />
          <Environment preset="night" environmentIntensity={0.3} />

          {/* Camera group that follows scroll */}
          <ScrollCamera />

          {/* Move all fish relative to scroll via a parent group */}
          <ScrollingFishGroup school={school} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ScrollingFishGroup({ school }: { school: ReturnType<typeof generateSchool> }) {
  const groupRef = useRef<THREE.Group>(null);
  const lastScrollY = useRef(0);
  const currentY = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = maxScroll > 0 ? scrollY / maxScroll : 0;
    const targetY = scrollRatio * 22;

    // If scroll jumped more than 500px (page navigation), snap instead of lerp
    const scrollDelta = Math.abs(scrollY - lastScrollY.current);
    lastScrollY.current = scrollY;

    if (scrollDelta > 500) {
      currentY.current = targetY;
    } else {
      // Gentle lerp — very slow so fish feel calm
      currentY.current += (targetY - currentY.current) * 0.03;
    }

    groupRef.current.position.y = currentY.current;
  });

  return (
    <group ref={groupRef}>
      {school.map((fish, i) => (
        <SwimmingBass key={i} {...fish} />
      ))}
    </group>
  );
}
