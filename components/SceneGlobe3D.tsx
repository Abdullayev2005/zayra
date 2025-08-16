"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useMemo, useRef } from "react";
import { Environment } from "@react-three/drei";

function GlobeGrid() {
  // Wireframe sharsimon panjara (lat/long)
  const group = useRef<THREE.Group>(null!);
  useFrame((_, d) => {
    if (!group.current) return;
    group.current.rotation.y += d * 0.15; // sekin auto-rotate
  });

  // Line obyektlarini (SVG <line> emas) oldindan yasab qo'yamiz
  const { latLines, lonLines } = useMemo(() => {
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#22d3ee"),
      transparent: true,
      opacity: 0.35,
    });

    const latSteps = 10; // ekvatordan qutblargacha
    const lonSteps = 18; // bo'ylama chiziqlar
    const radius = 1.35;

    const mkLatGeos = () => {
      const geos: THREE.BufferGeometry[] = [];
      for (let i = 1; i < latSteps; i++) {
        const phi = (i / latSteps) * Math.PI - Math.PI / 2; // -90..+90
        const r = Math.cos(phi) * radius;
        const y = Math.sin(phi) * radius;
        const pts: THREE.Vector3[] = [];
        for (let a = 0; a <= Math.PI * 2 + 0.0001; a += Math.PI / 96) {
          pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
        }
        geos.push(new THREE.BufferGeometry().setFromPoints(pts));
      }
      return geos;
    };

    const mkLonGeos = () => {
      const geos: THREE.BufferGeometry[] = [];
      for (let j = 0; j < lonSteps; j++) {
        const theta = (j / lonSteps) * Math.PI * 2;
        const pts: THREE.Vector3[] = [];
        for (
          let t = -Math.PI / 2;
          t <= Math.PI / 2 + 0.0001;
          t += Math.PI / 96
        ) {
          const r = Math.cos(t) * radius;
          const y = Math.sin(t) * radius;
          pts.push(
            new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r)
          );
        }
        geos.push(new THREE.BufferGeometry().setFromPoints(pts));
      }
      return geos;
    };

    const latLines = mkLatGeos().map((g) => new THREE.Line(g, lineMat));
    const lonLines = mkLonGeos().map((g) => new THREE.Line(g, lineMat));
    return { latLines, lonLines };
  }, []);

  return (
    <group ref={group}>
      {latLines.map((ln, i) => (
        <primitive key={`lat-${i}`} object={ln} />
      ))}
      {lonLines.map((ln, i) => (
        <primitive key={`lon-${i}`} object={ln} />
      ))}
    </group>
  );
}

function Markers() {
  // Bir nechta glow nuqtalar (barqaror joylashuv)
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#10b981"),
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const coords: [number, number, number][] = [
    [0.9, 0.6, 0.9],
    [-1.1, 0.2, 0.4],
    [0.3, -0.7, -1.2],
    [-0.8, 0.1, -1.3],
    [1.2, -0.2, 0.2],
  ];

  return (
    <group>
      {coords.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <primitive attach="material" object={mat} />
        </mesh>
      ))}
    </group>
  );
}

export default function SceneGlobe3D({
  className = "",
  hoverTilt = true,
}: {
  className?: string;
  hoverTilt?: boolean;
}) {
  const root = useRef<THREE.Group>(null!);

  // Kursorga qarab yengil tilt
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hoverTilt || !root.current) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width; // 0..1
    const ny = (e.clientY - r.top) / r.height; // 0..1
    const rx = THREE.MathUtils.lerp(0.25, -0.25, ny);
    const ry = THREE.MathUtils.lerp(-0.35, 0.35, nx);
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      rx,
      0.15
    );
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      ry,
      0.15
    );
  };

  return (
    <div className={className} onPointerMove={onMove}>
      <Canvas
        camera={{ position: [0, 0.6, 4.2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }} // fonsiz
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 4, 2]} intensity={1.1} />
          <group ref={root}>
            <GlobeGrid />
            <Markers />
          </group>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
