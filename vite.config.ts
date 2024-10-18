import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // указываете путь к папке, которую хотите использовать в качестве корня для псевдонима '@'
    },
  },
  build: {
    minify: true,
    cssMinify: true,
  },
})