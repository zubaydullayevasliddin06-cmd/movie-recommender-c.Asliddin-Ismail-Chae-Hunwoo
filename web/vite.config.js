import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In development the React app runs on http://localhost:5173 and the backend on :3000.
// This proxy forwards any /api/... request to the backend, so the browser sees one origin
// (no CORS headaches). See docs/VISION.md for the architecture.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
