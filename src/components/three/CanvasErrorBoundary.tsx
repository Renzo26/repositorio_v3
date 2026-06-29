import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Called once when a child throws, so the app can fall back gracefully. */
  onError: () => void;
}

interface State {
  hasError: boolean;
}

/**
 * Isolates the WebGL canvas. A Three.js / driver error here must never take
 * down the whole app — we swallow it, notify the provider (→ SVG fallback),
 * and render nothing.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[SystemCore] 3D canvas failed — using SVG fallback.", error, info);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
