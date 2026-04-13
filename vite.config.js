import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/nexus': {
          target: 'https://neurax-python-be-emhfejathhhpe6h3.uksouth-01.azurewebsites.net',
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
    },
  };
});
