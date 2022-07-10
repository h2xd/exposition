import { resolve as resolvePath } from 'path'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'

const resolve = path => resolvePath(__dirname, path)

export function definePackageBuild(path) {
  const entryFileName = path ? `${path}/index.ts` : 'index.ts'
  const outputFileName = path ? `dist/${path}` : 'dist/index'

  return [
    defineConfig({
      input: resolve(entryFileName),
      output: [
        {
          file: resolve(`${outputFileName}.cjs`),
          format: 'cjs',
          sourcemap: process.env.NODE_ENV === 'production',
        },
        {
          file: resolve(`${outputFileName}.mjs`),
          format: 'es',
          sourcemap: process.env.NODE_ENV === 'production',
        },
      ],
      plugins: [
        json(),
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
      input: resolve(entryFileName),
      output: [
        {
          file: resolve(`${outputFileName}.d.ts`),
          format: 'es',
        },
      ],
      plugins: [dts()],
    }),
  ]
}
