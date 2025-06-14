import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

// Define __dirname in ESM style
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      "@src": path.resolve(__dirname, "src"),
      "@i18n": path.resolve(__dirname, "src/i18n"),
      "@store": path.resolve(__dirname, "src/store"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@utilities": path.resolve(__dirname, "src/utilities"),
    },
  },
});
