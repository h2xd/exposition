import { resolve as resolvePath } from 'path'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import { definePackageBuild } from '../../scripts/build'

const resolve = path => resolvePath(__dirname, path)

const packages = [
  {
    name: 'msw',
  },
  {
    name: 'vue-devtools',
  },
]

function defineBuild() {
  const packageConfigs = packages.reduce((prevConfig, packageConfig) => {
    return [
      ...prevConfig,
      ...defineIntegrationBuild(packageConfig),
    ]
  }, [])

  return [
    ...definePackageBuild(),
    ...packageConfigs,
  ]
}

function defineIntegrationBuild(packageConfig) {
  return [
    defineConfig({
      input: resolve(`${packageConfig.name}/index.ts`),
      output: [
        {
          file: resolve(`dist/${packageConfig.name}.cjs`),
          format: 'cjs',
          sourcemap: process.env.NODE_ENV === 'production',
        },
        {
          file: resolve(`dist/${packageConfig.name}.mjs`),
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
          tsconfig: '../../tsconfig.json',
        }),
      ],
    }),
    defineConfig({
      input: resolve(`${packageConfig.name}/index.ts`),
      output: [
        {
          file: resolve(`dist/${packageConfig.name}.d.ts`),
          format: 'es',
        },
      ],
      plugins: [dts()],
    }),
  ]
}

export default defineBuild()
