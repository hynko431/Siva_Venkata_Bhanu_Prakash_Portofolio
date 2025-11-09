// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // Vite dev server configuration
  server: {
    host: "::",
    port: 8081,

    // ✅ Proxy API requests to backend (Express server)
    proxy: {
      "/api":'http://localhost:8082',
    },
  },

  plugins: [react()],

  // Build optimizations
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
