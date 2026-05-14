import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Function form (not object) so this works under both rollup (the
        // Vite 5 default) and rolldown (used by some local Vite installs).
        // The object form is rollup-only.
        manualChunks(id) {
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }
          if (
            id.includes('/node_modules/leaflet/') ||
            id.includes('/node_modules/react-leaflet/') ||
            id.includes('/node_modules/@react-leaflet/') ||
            id.includes('/node_modules/topojson-client/')
          ) {
            return 'vendor-leaflet';
          }
          if (id.includes('/node_modules/three/')) {
            return 'vendor-three';
          }
        },
      },
    },
  },
});
