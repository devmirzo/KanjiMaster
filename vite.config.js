import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite konfiguratsiyasi
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
});
