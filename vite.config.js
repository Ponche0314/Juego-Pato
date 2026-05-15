import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["api-moviles-1k4o.onrender.com"],
  },
  preview: {
    allowedHosts: ["api-moviles-1k4o.onrender.com"],
  },
});
