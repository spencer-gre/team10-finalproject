// import { defineConfig } from 'vite'
// import { svelte } from '@sveltejs/vite-plugin-svelte'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [svelte()],
// })
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      util: "util/",
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        hangman: resolve(__dirname, "hangman.html"),
        crossword: resolve(__dirname, "crossword.html"),
        admin: resolve(__dirname, "admin.html"),
      }
    }
  },
  define: {
    'process.env': process.env
  }
})