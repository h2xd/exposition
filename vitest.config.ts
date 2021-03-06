/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { resolve as resolvePath } from 'path'
import { defineConfig } from 'vite'

const resolve = (path: string) => resolvePath(__dirname, path)

export default defineConfig({
  resolve: {
    alias: {
      '@exposition/core': resolve('packages/core/index.ts'),
      '@exposition/web': resolve('packages/web/index.ts'),
      '@exposition/sdk': resolve('packages/sdk/index.ts'),
      '@exposition/msw': resolve('packages/msw/index.ts'),
    },
  },
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  test: {
    globals: true,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './.tests/unittest.xml',
    },
  },
})
