import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router";
import { SystemCoreProvider } from "@/contexts/SystemCoreContext";

export function App() {
  return (
    <SystemCoreProvider>
      <RouterProvider router={router} />
    </SystemCoreProvider>
  );
}
