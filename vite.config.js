import { defineConfig } from "vite";

export default defineConfig({
  server: {
    allowedHosts: ["api-moviles-1k4o.onrender.com"],
  },
  preview: {
    allowedHosts: ["api-moviles-1k4o.onrender.com"],
  },
});
