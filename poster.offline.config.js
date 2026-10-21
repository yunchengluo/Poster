import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  plugins: [
    {
      name: 'poster-offline-images',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('/posterContent.js')) return null
        return code.replace(/new URL\('([^']+)', import\.meta\.url\)\.href/g, (_, relative) => {
          const filename = path.resolve(path.dirname(id), relative)
          const mime = filename.endsWith('.png') ? 'image/png' : 'image/jpeg'
          return JSON.stringify(`data:${mime};base64,${readFileSync(filename).toString('base64')}`)
        })
      },
    },
    vue(),
  ],
  build: {
    outDir: 'tmp/poster-offline-build',
    lib: {
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      name: 'CI3Poster',
      formats: ['iife'],
      fileName: 'poster',
      cssFileName: 'poster',
    },
    cssCodeSplit: false,
    reportCompressedSize: false,
  },
})
