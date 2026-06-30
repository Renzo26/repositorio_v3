import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { SystemCoreState } from "@/types";
import { ACCENT_HEX } from "@/types";
import { getCoreTarget } from "./coreTargets";

interface GltfCoreProps {
  state: SystemCoreState;
  exploded: boolean;
}

const MODEL_URL = "/models/cubo_de_energia.glb";
/** Normalise the model's largest dimension to ~this many world units, so the
 *  per-section scales tuned for the old Core keep working. */
const FIT = 3.2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Drop-in replacement for the procedural System Core: loads the Sketchfab
 * model (a GLB), centres + normalises it, then reuses the per-section
 * placement (coreTargets), pointer parallax, slow spin and accent light.
 */
export function GltfCore({ state }: GltfCoreProps) {
  const gltf = useLoader(GLTFLoader, MODEL_URL);

  // Center at origin and scale to a predictable size. Sketchfab/FBX exports
  // bake their transform into node matrices and ship a floor Plane + Camera,
  // so we: drop those helpers, update matrices BEFORE measuring (else the
  // bounds ignore the baked scale and the model ends up invisibly tiny), then
  // recenter + normalise on a wrapper group.
  const model = useMemo(() => {
    const scene = gltf.scene.clone(true);
    scene.updateMatrixWorld(true);

    // The export bundles huge flat helpers (a floor Plane and a ~40-unit
    // "energy field" disc) around a ~5-unit cube. Measure every mesh and drop
    // the outliers (much larger than the median) so the bounds — and thus the
    // normalising scale — track the real cube, not the giant field.
    const meshes: { mesh: THREE.Object3D; size: number }[] = [];
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh && mesh.geometry) {
        const s = new THREE.Vector3();
        new THREE.Box3().setFromObject(mesh).getSize(s);
        meshes.push({ mesh, size: Math.max(s.x, s.y, s.z) });
      }
    });
    if (meshes.length > 2) {
      const sorted = meshes.map((m) => m.size).sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)] || 1;
      meshes
        .filter((m) => m.size > median * 3)
        .forEach((m) => m.mesh.parent?.remove(m.mesh));
    }

    const wrap = new THREE.Group();
    wrap.add(scene);
    wrap.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(wrap);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    // wrap sits at the origin, so its world-space box center is also its local
    // center; shifting the scene by -center pins the model to the origin.
    scene.position.sub(center);
    wrap.scale.setScalar(FIT / maxDim);

    if (import.meta.env.DEV) {
      console.info(
        "[GltfCore] size",
        size.toArray().map((v) => +v.toFixed(3)),
        "maxDim",
        +maxDim.toFixed(3),
      );
    }
    return wrap;
  }, [gltf]);

  const group = useRef<THREE.Group>(null);
  const coreLight = useRef<THREE.PointLight>(null);

  const anim = useRef({ light: 1 });
  const accent = useRef(new THREE.Color(ACCENT_HEX["pastel-peach"]));
  const accentTarget = useRef(new THREE.Color(ACCENT_HEX["pastel-peach"]));
  const pointer = useRef({ x: 0, y: 0 });
  const targetRef = useRef(getCoreTarget(state));

  useEffect(() => {
    targetRef.current = getCoreTarget(state);
  }, [state]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((three, delta) => {
    const t = three.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const a = anim.current;
    const tg = targetRef.current;

    a.light = lerp(a.light, tg.light, Math.min(1, dt * 2.4));
    accentTarget.current.set(ACCENT_HEX[tg.accent]);
    accent.current.lerp(accentTarget.current, Math.min(1, dt * 2.2));
    if (coreLight.current) {
      coreLight.current.color.copy(accent.current);
      coreLight.current.intensity = a.light * 3.4;
    }

    const g = group.current;
    if (g) {
      const k = Math.min(1, dt * 2.2);
      const floatY = tg.position[1] + Math.sin(t * 0.7) * 0.05;
      g.position.x = lerp(g.position.x, tg.position[0], k);
      g.position.y = lerp(g.position.y, floatY, k);
      g.position.z = lerp(g.position.z, tg.position[2], k);
      g.scale.setScalar(lerp(g.scale.x, tg.scale, k));

      // Pointer-driven rotation: the cube actively turns to follow the cursor
      // (wide range) and snaps toward it quickly, over a gentle idle spin.
      const ty = tg.rotation[1] + t * 0.1 + pointer.current.x * 0.9;
      const tx = tg.rotation[0] + pointer.current.y * 0.6;
      g.rotation.y = lerp(g.rotation.y, ty, Math.min(1, dt * 5));
      g.rotation.x = lerp(g.rotation.x, tx, Math.min(1, dt * 5));
    }
  });

  return (
    <group ref={group}>
      <pointLight
        ref={coreLight}
        position={[0, 0, 0.6]}
        distance={6}
        intensity={3.4}
      />
      <primitive object={model} />
    </group>
  );
}
