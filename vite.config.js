/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["import", "global-builtin"],
      },
    },
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/umbraco': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
