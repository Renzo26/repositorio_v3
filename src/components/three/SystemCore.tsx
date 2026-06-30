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

const GRID = 3;
const GAP = 0.78;
const CUBE = 0.62;

interface Cell {
  base: THREE.Vector3;
  jitter: THREE.Vector3;
  out: THREE.Vector3;
  spread: number;
  phase: number;
  amp: number;
  detached: boolean;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function buildCells(): Cell[] {
  const cells: Cell[] = [];
  const half = (GRID - 1) / 2;

  let seed = 9_271;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      for (let z = 0; z < GRID; z++) {
        const base = new THREE.Vector3(
          (x - half) * GAP,
          (y - half) * GAP,
          (z - half) * GAP,
        );

        const out = base.clone();
        if (out.lengthSq() === 0) out.set(0, 1, 0);
        out.normalize();

        const isTop = y === GRID - 1;
        const detached = (isTop && rnd() > 0.5) || rnd() > 0.9;

        cells.push({
          base,
          jitter: new THREE.Vector3(
            (rnd() - 0.5) * 0.06,
            (rnd() - 0.5) * 0.06,
            (rnd() - 0.5) * 0.06,
          ),
          out,
          spread: 0.32 + rnd() * 0.32 + (detached ? 0.32 : 0),
          phase: rnd() * Math.PI * 2,
          amp: 0.025 + rnd() * 0.04,
          detached,
        });
      }
    }
  }
  return cells;
}

export function SystemCore({ state, exploded }: SystemCoreProps) {
  const group = useRef<THREE.Group>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);

  const cells = useMemo(buildCells, []);

  const geom = useMemo(
    () => new RoundedBoxGeometry(CUBE, CUBE, CUBE, 5, 0.12),
    [],
  );
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xf1ccc4,
        roughness: 0.32,
        metalness: 0.06,
      }),
    [],
  );

  const anim = useRef({ gather: 0, explode: 0, light: 1 });
  const accent = useRef(new THREE.Color(ACCENT_HEX["pastel-peach"]));
  const accentTarget = useRef(new THREE.Color(ACCENT_HEX["pastel-peach"]));
  const pointer = useRef({ x: 0, y: 0 });
  const hover = useRef(0);
  const scrollGather = useRef(0);
  const targetRef = useRef(getCoreTarget(state));
  const explodeRef = useRef(exploded);
  const tmp = useRef(new THREE.Vector3());

  useEffect(() => {
    targetRef.current = getCoreTarget(state);
  }, [state]);
  useEffect(() => {
    explodeRef.current = exploded;
  }, [exploded]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      if (e.clientY < window.innerHeight) hover.current = 1;
    };
    const onScroll = () => {
      scrollGather.current = clamp01(window.scrollY / (window.innerHeight * 0.6));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      geom.dispose();
      mat.dispose();
    };
  }, [geom, mat]);

  useFrame((three, delta) => {
    const t = three.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const a = anim.current;
    const tg = targetRef.current;

    hover.current = Math.max(0, hover.current - dt * 1.4);
    const gatherTarget = explodeRef.current
      ? 0
      : Math.max(hover.current, scrollGather.current);

    a.gather = lerp(a.gather, gatherTarget, Math.min(1, dt * 3));
    a.explode = lerp(a.explode, explodeRef.current ? 1 : 0, Math.min(1, dt * 3));
    a.light = lerp(a.light, tg.light, Math.min(1, dt * 2.4));

    accentTarget.current.set(ACCENT_HEX[tg.accent]);
    accent.current.lerp(accentTarget.current, Math.min(1, dt * 2.2));
    if (coreLight.current) {
      coreLight.current.color.copy(accent.current);
      coreLight.current.intensity = a.light * (3.6 + a.gather * 1.6);
    }

    const g = group.current;
    if (g) {
      const k = Math.min(1, dt * 2.2);
      g.position.x = lerp(g.position.x, tg.position[0], k);
      g.position.y = lerp(g.position.y, tg.position[1], k);
      g.position.z = lerp(g.position.z, tg.position[2], k);
      g.scale.setScalar(lerp(g.scale.x, tg.scale, k));

      const ty = tg.rotation[1] + t * 0.12 + pointer.current.x * 0.22;
      const tx = tg.rotation[0] + pointer.current.y * 0.12;
      g.rotation.y = lerp(g.rotation.y, ty, Math.min(1, dt * 2.6));
      g.rotation.x = lerp(g.rotation.x, tx, Math.min(1, dt * 2.6));
    }

    const scatter = (1 - a.gather) + a.explode * 0.9;
    cells.forEach((c, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      const bob = Math.sin(t * 0.85 + c.phase) * c.amp;
      const base = c.detached ? 0.28 : 0;

      const p = tmp.current;
      p.copy(c.base).add(c.jitter);
      p.addScaledVector(c.out, base + c.spread * scatter);
      p.y += bob + (c.detached ? bob * 0.6 : 0);
      mesh.position.copy(p);

      if (c.detached) {
        mesh.rotation.x = t * 0.18 + c.phase;
        mesh.rotation.y = t * 0.14 + c.phase;
      }
    });
  });

  return (
    <group ref={group}>
      <pointLight ref={coreLight} position={[0, 0, 0.2]} distance={4} intensity={3.6} />

      {cells.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          geometry={geom}
          material={mat}
        />
      ))}
    </group>
  );
}
