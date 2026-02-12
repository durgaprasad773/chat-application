import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/nexus': {
        target: 'https://neurax-python-be-emhfejathhhpe6h3.uksouth-01.azurewebsites.net',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
