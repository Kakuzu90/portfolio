import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function staticRouteFallbacks() {
  return {
    name: 'static-route-fallbacks',
    closeBundle() {
      const output = resolve('dist')

      for (const route of ['dev', 'client']) {
        const directory = resolve(output, route)
        mkdirSync(directory, { recursive: true })
        copyFileSync(resolve(output, 'index.html'), resolve(directory, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [vue(), staticRouteFallbacks()],
})
