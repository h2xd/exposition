import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

export default [
  defineConfig({
    input: './packages/core/index.ts',
    output: [
      {
        file: './packages/core/dist/index.cjs',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV === 'production'
      },
      {
        file: './packages/core/dist/index.mjs',
        format: 'es',
        sourcemap: process.env.NODE_ENV === 'production'
      },
    ],
    plugins: [
      esbuild({
        include: /\.[jt]sx?$/,
        sourceMap: false,
        minify: process.env.NODE_ENV === 'production',
        target: 'es2017',
        jsx: 'transform',
        define: {
          __VERSION__: '"x.y.z"',
        },
        tsconfig: 'tsconfig.json',
      }),
    ],
  }),
  defineConfig({
    input: './packages/core/index.ts',
    output: [
      {
        file: './packages/core/dist/index.d.ts',
        format: 'es',
      }
    ],
    plugins: [dts()]
  })
]
