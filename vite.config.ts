import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,       
    host: '0.0.0.0',  
    strictPort: true,
    // Para testeo de vistas en otros dispositivos con: npx localtunnel --port 5173  
    allowedHosts: ['full-seas-grow.loca.lt'] 
  },
})
