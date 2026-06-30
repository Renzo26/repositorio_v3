import { Canvas } from "@react-three/fiber";
import { useSystemCore } from "@/contexts/SystemCoreContext";
import { SystemCore } from "./SystemCore";

/**
 * Global, transparent WebGL canvas. Lazy-loaded (default export) so Three.js
 * stays out of the main bundle. No shadows, no post-processing, DPR <= 1.5.
 */
export default function SystemCoreCanvas() {
  const { state, exploded } = useSystemCore();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={1.3} color={0xfff3e6} />
      <directionalLight position={[-5, -2, -4]} intensity={0.45} color={0xbfd0ff} />
      <SystemCore state={state} exploded={exploded} />
    </Canvas>
  );
}
