// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/bookreactapi/',
// })


// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
   base: '/bookreactapi/',
  server: {

    proxy: {
      // proxies /bookapi/* to your Spring Boot backend on port 8081
      "/bookapi": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/bookapi/, "/bookapi")
      }
    }
  }
});
