import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
//const webpack = require('webpack');
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      // new webpack.ProvidePlugin({
      //     Buffer: ['buffer', 'Buffer'],
      // }),
      // new webpack.ProvidePlugin({
      //     process: 'process/browser',
      // }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser polyfills
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
       buffer: 'buffer',
    },
  },
  build: {
    minify: true,
    cssMinify: true,
 
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    }
  }

})