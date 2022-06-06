import { resolve as resolvePath } from 'path'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

const resolve = path => resolvePath(__dirname, path)

export function definePackageBuild() {
  return [
    defineConfig({
      input: resolve('index.ts'),
      output: [
        {
          file: resolve('dist/index.cjs'),
          format: 'cjs',
          sourcemap: process.env.NODE_ENV === 'production',
        },
        {
          file: resolve('dist/index.mjs'),
          format: 'es',
          sourcemap: process.env.NODE_ENV === 'production',
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
      input: resolve('index.ts'),
      output: [
        {
          file: resolve('dist/index.d.ts'),
          format: 'es',
        },
      ],
      plugins: [dts()],
    }),
  ]
}
