import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import packageJson from './package.json';


// https://vitejs.dev/config/
export default defineConfig({
  base: "/svelte-scanner/",
  plugins: [svelte()],
  define:  {
    'import.meta.env.VITE_PACKAGE_VERSION': JSON.stringify(packageJson.version),
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(new Date().toISOString())
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
  },
})
