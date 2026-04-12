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

// Shared textures — loaded once
let sharedTextures: { albedo: THREE.Texture; alpha: THREE.Texture; normal: THREE.Texture; roughness: THREE.Texture } | null = null;
function getTextures() {
  if (sharedTextures) return sharedTextures;
  const l = new THREE.TextureLoader();
  const albedo = l.load(TEXTURES.albedo);
  const alpha = l.load(TEXTURES.alpha);
  const normal = l.load(TEXTURES.normal);
  const roughness = l.load(TEXTURES.roughness);
  [albedo, alpha, normal, roughness].forEach((t) => { t.flipY = false; });
  albedo.colorSpace = THREE.SRGBColorSpace;
  sharedTextures = { albedo, alpha, normal, roughness };
  return sharedTextures;
}

function createSwimMaterial(opacity: number) {
  const tex = getTextures();
  const mat = new THREE.MeshStandardMaterial({
    map: tex.albedo, alphaMap: tex.alpha, normalMap: tex.normal, roughnessMap: tex.roughness,
    roughness: 0.65, metalness: 0.1, envMapIntensity: 0.8,
    transparent: true, alphaTest: 0.1, opacity, side: THREE.DoubleSide,
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    shader.uniforms.uIntensity = { value: 1.0 };

    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
      uniform float uTime;
      uniform float uIntensity;`
    );

    // Swimming deformation: sine wave along body length
    // Model Z range: -0.209 to 0.200 (length ~0.41)
    // Tail is at -Z, head is at +Z
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>

      // 0 = head (+Z), 1 = tail (-Z)
      float bodyPos = clamp(1.0 - (position.z + 0.21) / 0.41, 0.0, 1.0);

      // Tail whips harder (cubic falloff)
      float tailPower = bodyPos * bodyPos * bodyPos;

      // Traveling wave from head to tail
      float wave = sin(uTime * 5.0 - bodyPos * 4.0);

      // Main side-to-side motion (X axis) — hard tail whip
      transformed.x += wave * 0.06 * tailPower * uIntensity;

      // Pectoral fins: vertices near the middle-sides of the body get extra motion
      float finZone = smoothstep(0.15, 0.0, abs(position.z)) * smoothstep(-0.02, -0.05, position.y);
      float finFlap = sin(uTime * 9.0) * 0.028 * finZone * uIntensity;
      transformed.y += finFlap;
      // Fins splay outward
      transformed.x += sin(uTime * 9.0 + 1.5) * 0.012 * finZone * uIntensity * sign(position.x);

      // Vertical undulation
      transformed.y += wave * 0.018 * tailPower * uIntensity;`
    );

    (mat as any)._swimShader = shader;
  };

  return mat;
}

function SwimmingBass({
  y, z, fishScale = 1, speed = 1, direction = 1,
  fishOpacity = 1, yDrift = 0.15, swimIntensity = 1,
}: {
  y: number; z: number; fishScale?: number; speed?: number;
  direction?: number; fishOpacity?: number; yDrift?: number; swimIntensity?: number;
}) {
  const { scene } = useGLTF(BASS_MODEL);
  const groupRef = useRef<THREE.Group>(null);
  const timeOffset = useRef(Math.random() * 100);
  const matsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    const mats: THREE.MeshStandardMaterial[] = [];
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = createSwimMaterial(fishOpacity);
        child.material = mat;
        child.geometry.computeVertexNormals();
        mats.push(mat);
      }
    });
    matsRef.current = mats;
    return cloned;
  }, [scene, fishOpacity]);

  const s = 10 * fishScale;
  const range = 30;
  const fadeZone = 4;
  const faceDir = direction > 0 ? Math.PI / 2 : -Math.PI / 2;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + timeOffset.current;

    // Swim across
    const rawX = (t * speed * 0.35) % range;
    const x = direction > 0 ? -range / 2 + rawX : range / 2 - rawX;
    groupRef.current.position.x = x;
    groupRef.current.position.y = y + Math.sin(t * 0.3 * speed) * yDrift;

    // Edge fade
    const absX = Math.abs(x);
    let edgeOpacity = 1;
    if (absX > range / 2 - fadeZone) {
      edgeOpacity = Math.max(0, (range / 2 - absX) / fadeZone);
    }

    // Update shader time + opacity
    matsRef.current.forEach((mat) => {
      mat.opacity = fishOpacity * edgeOpacity;
      const shader = (mat as any)._swimShader;
      if (shader) {
        shader.uniforms.uTime.value = t * speed;
        shader.uniforms.uIntensity.value = swimIntensity;
      }
    });

    // Yaw wobble — moderate, not too tilty
    groupRef.current.rotation.y = faceDir + Math.sin(t * speed * 1.5) * 0.06;
    groupRef.current.rotation.z = Math.sin(t * speed * 0.8) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0, y, z]}>
      <primitive object={clonedScene} scale={[s, s, s]} />
    </group>
  );
}

function generateSchool() {
  // 18 fish, speeds vary from 0.3 (cruising) to 0.7 (hauling ass)
  return [
    // === TOP ===
    { y: 2.5, z: -0.5, fishScale: 1.2, speed: 0.55, direction: 1, fishOpacity: 0.9, yDrift: 0.08, swimIntensity: 1.2 },
    { y: 0.3, z: -1, fishScale: 1.0, speed: 0.35, direction: -1, fishOpacity: 0.85, yDrift: 0.1, swimIntensity: 1.0 },
    { y: -1.2, z: -2, fishScale: 0.75, speed: 0.65, direction: 1, fishOpacity: 0.75, yDrift: 0.1, swimIntensity: 1.3 },
    { y: 1.5, z: -1.5, fishScale: 0.8, speed: 0.4, direction: -1, fishOpacity: 0.8, yDrift: 0.08, swimIntensity: 1.0 },

    // === MID-TOP ===
    { y: -3, z: -0.5, fishScale: 1.1, speed: 0.45, direction: -1, fishOpacity: 0.9, yDrift: 0.08, swimIntensity: 1.1 },
    { y: -4.5, z: -1.5, fishScale: 0.85, speed: 0.7, direction: 1, fishOpacity: 0.8, yDrift: 0.1, swimIntensity: 1.4 },
    { y: -5.5, z: -2.5, fishScale: 0.6, speed: 0.3, direction: -1, fishOpacity: 0.6, yDrift: 0.1, swimIntensity: 0.8 },
    { y: -6.5, z: -1, fishScale: 0.95, speed: 0.5, direction: 1, fishOpacity: 0.85, yDrift: 0.08, swimIntensity: 1.1 },

    // === MIDDLE ===
    { y: -9, z: -0.5, fishScale: 1.15, speed: 0.4, direction: 1, fishOpacity: 0.9, yDrift: 0.08, swimIntensity: 1.0 },
    { y: -10.5, z: -1.5, fishScale: 0.8, speed: 0.6, direction: -1, fishOpacity: 0.75, yDrift: 0.1, swimIntensity: 1.3 },
    { y: -11.5, z: -1, fishScale: 0.9, speed: 0.35, direction: 1, fishOpacity: 0.8, yDrift: 0.08, swimIntensity: 1.0 },
    { y: -13, z: -2, fishScale: 0.65, speed: 0.55, direction: -1, fishOpacity: 0.65, yDrift: 0.1, swimIntensity: 1.2 },

    // === LOWER ===
    { y: -15, z: -1, fishScale: 1.0, speed: 0.5, direction: -1, fishOpacity: 0.85, yDrift: 0.08, swimIntensity: 1.1 },
    { y: -16.5, z: -0.5, fishScale: 0.9, speed: 0.3, direction: 1, fishOpacity: 0.85, yDrift: 0.08, swimIntensity: 0.9 },
    { y: -18, z: -2, fishScale: 0.7, speed: 0.65, direction: -1, fishOpacity: 0.7, yDrift: 0.1, swimIntensity: 1.3 },

    // === DEEP ===
    { y: -20, z: -1, fishScale: 1.1, speed: 0.45, direction: 1, fishOpacity: 0.85, yDrift: 0.08, swimIntensity: 1.0 },
    { y: -21.5, z: -1.5, fishScale: 0.75, speed: 0.55, direction: -1, fishOpacity: 0.7, yDrift: 0.1, swimIntensity: 1.2 },
    { y: -23, z: -0.5, fishScale: 0.85, speed: 0.35, direction: 1, fishOpacity: 0.8, yDrift: 0.08, swimIntensity: 1.0 },
  ];
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
    const scrollDelta = Math.abs(scrollY - lastScrollY.current);
    lastScrollY.current = scrollY;
    if (scrollDelta > 500) {
      currentY.current = targetY;
    } else {
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
          <ambientLight intensity={0.3} color="#b0c4b8" />
          <directionalLight position={[6, 4, 5]} intensity={1.0} color="#e0ece4" />
          <directionalLight position={[-5, 2, -3]} intensity={0.3} color="#7a9e8e" />
          <pointLight position={[0, 1, -6]} intensity={2} color="#4a9e7e" distance={15} decay={2} />
          <pointLight position={[0, -3, 0]} intensity={0.2} color="#3a5a4a" distance={10} decay={2} />
          <Environment preset="night" environmentIntensity={0.3} />
          <ScrollingFishGroup school={school} />
        </Suspense>
      </Canvas>
    </div>
  );
}
