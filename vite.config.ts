
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        ContactInsights: 'src/ContactInsights.tsx',
        DealPipeline: 'src/DealPipeline.tsx',
        CompanyMetrics: 'src/CompanyMetrics.tsx'
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es'
      }
    }
  }
}));
