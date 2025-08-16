"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";

function Knot({ color = "#10b981" }) {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        roughness: 0.15,
        metalness: 0.7,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.2,
      }),
    [color]
  );

  return (
    <Float floatIntensity={1} rotationIntensity={0.7} speed={1.1}>
      <mesh rotation={[0.25, 0.35, 0]}>
        <torusKnotGeometry args={[1.0, 0.32, 220, 28]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </Float>
  );
}

function Rig({
  pointer,
}: {
  pointer: { x: number; y: number; active: boolean };
}) {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (!group.current) return;
    const targetX = pointer.active
      ? THREE.MathUtils.lerp(-0.35, 0.35, (pointer.x + 1) / 2)
      : 0;
    const targetY = pointer.active
      ? THREE.MathUtils.lerp(-0.25, 0.25, (pointer.y + 1) / 2)
      : 0;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetX,
      0.08
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetY,
      0.08
    );
  });
  return (
    <group ref={group} position={[0.35, 0.15, 0]}>
      <Knot />
    </group>
  );
}

export default function Scene3D({ className = "" }: { className?: string }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0, active: false });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setPointer({ x: x * 2 - 1, y: y * 2 - 1, active: true });
      }}
      onPointerLeave={() => setPointer((p) => ({ ...p, active: false }))}
    >
      <Canvas
        camera={{ position: [1.2, 0.8, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 2]} intensity={1.2} />
          <Rig pointer={pointer} />
          <Environment preset="city" />
          {isTouch && (
            <group rotation={[0, 0.4, 0]}>
              <Knot />
            </group>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
