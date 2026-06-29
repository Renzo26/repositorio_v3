import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { SystemCoreState } from "@/types";
import { ACCENT_HEX } from "@/types";
import { getCoreTarget } from "./coreTargets";

interface SystemCoreProps {
  state: SystemCoreState;
  exploded: boolean;
}

/** Orbiting modules — asymmetric arrangement, a few "filled" (accent). */
const RAW_MODULES: { dir: [number, number, number]; radius: number; size: number; accent: boolean }[] = [
  { dir: [0.2, 0.95, 0.15], radius: 1.55, size: 0.17, accent: true },
  { dir: [1.0, 0.35, 0.2], radius: 1.7, size: 0.12, accent: false },
  { dir: [0.85, -0.55, -0.3], radius: 1.6, size: 0.21, accent: true },
  { dir: [-0.3, -0.92, 0.25], radius: 1.5, size: 0.13, accent: false },
  { dir: [-1.0, 0.15, -0.25], radius: 1.72, size: 0.16, accent: false },
  { dir: [-0.6, 0.7, 0.45], radius: 1.42, size: 0.11, accent: true },
  { dir: [0.45, -0.2, 1.0], radius: 1.5, size: 0.14, accent: false },
];

const ORBITERS: [number, number, number][] = [
  [2.05, 0.25, 0],
  [-1.4, -0.2, 1.45],
  [0.3, 1.9, -0.8],
];

const UP = new THREE.Vector3(0, 1, 0);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function SystemCore({ state, exploded }: SystemCoreProps) {
  const group = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const accentLight = useRef<THREE.PointLight>(null);
  const moduleRefs = useRef<THREE.Mesh[]>([]);
  const connectorRefs = useRef<THREE.Mesh[]>([]);

  // Shared, reused materials + geometries.
  const mats = useMemo(
    () => ({
      ceramic: new THREE.MeshStandardMaterial({ color: 0xcac6bd, roughness: 0.72, metalness: 0.12 }),
      metal: new THREE.MeshStandardMaterial({ color: 0x70706c, roughness: 0.32, metalness: 0.85 }),
      accent: new THREE.MeshStandardMaterial({
        color: 0x0d0d0d,
        emissive: new THREE.Color(ACCENT_HEX["pastel-lilac"]),
        emissiveIntensity: 0.95,
        roughness: 0.45,
        metalness: 0.2,
      }),
      connector: new THREE.MeshBasicMaterial({
        color: new THREE.Color(ACCENT_HEX["pastel-lilac"]),
        transparent: true,
        opacity: 0,
      }),
    }),
    [],
  );
  const geom = useMemo(
    () => ({
      box: new THREE.BoxGeometry(1, 1, 1),
      cyl: new THREE.CylinderGeometry(0.012, 0.012, 1, 6),
      node: new THREE.OctahedronGeometry(0.05, 0),
      coreOuter: new RoundedBoxGeometry(0.62, 0.62, 0.62, 4, 0.1),
      coreInner: new RoundedBoxGeometry(0.34, 0.34, 0.34, 4, 0.06),
    }),
    [],
  );

  const modules = useMemo(
    () =>
      RAW_MODULES.map((m) => {
        const dir = new THREE.Vector3(...m.dir).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(UP, dir);
        return { ...m, dir, quat };
      }),
    [],
  );

  // Smoothly-driven scalars + colors.
  const anim = useRef({ assemble: 0, explode: 0, sep: 1, light: 1 });
  const accent = useRef(new THREE.Color(ACCENT_HEX["pastel-lilac"]));
  const accentTarget = useRef(new THREE.Color(ACCENT_HEX["pastel-lilac"]));
  const pointer = useRef({ x: 0, y: 0 });
  const targetRef = useRef(getCoreTarget(state));
  const explodeRef = useRef(exploded);

  useEffect(() => {
    targetRef.current = getCoreTarget(state);
  }, [state]);
  useEffect(() => {
    explodeRef.current = exploded;
  }, [exploded]);

  // Global pointer (canvas is pointer-events:none, so listen on window).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const m = mats;
    const g = geom;
    return () => {
      Object.values(m).forEach((mat) => mat.dispose());
      Object.values(g).forEach((ge) => ge.dispose());
    };
  }, [mats, geom]);

  useFrame((stateThree, delta) => {
    const t = stateThree.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const a = anim.current;
    const tg = targetRef.current;

    a.assemble = lerp(a.assemble, 1, Math.min(1, dt * 1.3));
    a.explode = lerp(a.explode, explodeRef.current ? 1 : 0, Math.min(1, dt * 3));
    a.sep = lerp(a.sep, tg.separation, Math.min(1, dt * 2.4));
    a.light = lerp(a.light, tg.light, Math.min(1, dt * 2.4));

    // Accent colour transition.
    accentTarget.current.set(ACCENT_HEX[tg.accent]);
    accent.current.lerp(accentTarget.current, Math.min(1, dt * 2.2));
    mats.accent.emissive.copy(accent.current);
    mats.connector.color.copy(accent.current);
    mats.connector.opacity = a.assemble * 0.5;
    if (accentLight.current) {
      accentLight.current.color.copy(accent.current);
      accentLight.current.intensity = a.light * (3 + a.explode * 1.5);
    }

    const g = group.current;
    if (g) {
      const k = Math.min(1, dt * 2.2);
      g.position.x = lerp(g.position.x, tg.position[0], k);
      g.position.y = lerp(g.position.y, tg.position[1], k);
      g.position.z = lerp(g.position.z, tg.position[2], k);

      const s = tg.scale * (0.84 + 0.16 * a.assemble);
      g.scale.setScalar(lerp(g.scale.x, s, k));

      const ty = tg.rotation[1] + t * 0.08 + pointer.current.x * 0.18;
      const tx = tg.rotation[0] + pointer.current.y * 0.1;
      g.rotation.y = lerp(g.rotation.y, ty, Math.min(1, dt * 2.6));
      g.rotation.x = lerp(g.rotation.x, tx, Math.min(1, dt * 2.6));
    }

    const scatter = 1 - a.assemble;
    modules.forEach((m, i) => {
      const dist = m.radius * a.sep * (1 + a.explode * 0.7) + Math.sin(t * 1.1 + i) * 0.03;
      const mesh = moduleRefs.current[i];
      if (mesh) {
        mesh.position.copy(m.dir).multiplyScalar(dist + scatter * 1.4);
        mesh.rotation.set(t * 0.25 + i, t * 0.2, 0);
        mesh.scale.setScalar(m.size * (0.5 + 0.5 * a.assemble));
      }
      const con = connectorRefs.current[i];
      if (con) {
        con.position.copy(m.dir).multiplyScalar(dist / 2);
        con.scale.y = Math.max(0.001, dist);
      }
    });

    if (ringsRef.current) {
      ringsRef.current.rotation.z += dt * 0.08;
      ringsRef.current.rotation.x += dt * 0.02;
    }
    if (orbitRef.current) orbitRef.current.rotation.y += dt * 0.16;
  });

  return (
    <group ref={group}>
      <pointLight ref={accentLight} position={[0, 0, 1.2]} distance={9} intensity={2} />

      {/* Core module */}
      <mesh geometry={geom.coreOuter} material={mats.metal} />
      <mesh geometry={geom.coreInner} material={mats.accent} />

      {/* Connectors (thin, oriented along each module direction) */}
      {modules.map((m, i) => (
        <mesh
          key={`c-${i}`}
          ref={(el) => {
            if (el) connectorRefs.current[i] = el;
          }}
          geometry={geom.cyl}
          material={mats.connector}
          quaternion={m.quat}
        />
      ))}

      {/* Modules */}
      {modules.map((m, i) => (
        <mesh
          key={`m-${i}`}
          ref={(el) => {
            if (el) moduleRefs.current[i] = el;
          }}
          geometry={geom.box}
          material={m.accent ? mats.accent : mats.ceramic}
        />
      ))}

      {/* Rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2.2, 0.3, 0]} material={mats.metal}>
          <torusGeometry args={[1.7, 0.012, 8, 80]} />
        </mesh>
        <mesh rotation={[Math.PI / 1.7, -0.4, 0.5]} material={mats.metal}>
          <torusGeometry args={[1.95, 0.01, 8, 80]} />
        </mesh>
      </group>

      {/* Orbiting nodes */}
      <group ref={orbitRef}>
        {ORBITERS.map((pos, i) => (
          <mesh key={`o-${i}`} position={pos} geometry={geom.node} material={mats.accent} />
        ))}
      </group>
    </group>
  );
}
