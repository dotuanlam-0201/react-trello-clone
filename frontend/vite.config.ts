import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
    "typeof process !== 'undefined'": "true",
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
