import type { Exposition } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'
import type { ExpositionValues } from '../../core/dist'

type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName }

type ExpositionUrlParameters = Distinct<string, 'UrlParameters'>

export function encodeUrlParameters<T extends Exposition<any>>(exposition: T): ExpositionUrlParameters {
  const values = getExpositionValues(exposition)

  const scenarioChunks = Object.keys(values).reduce<string[]>((accumulator, key) => {
    const value = values[key]

    return [
      ...accumulator,
      `${key}:${value}`,
    ]
  }, [])

  return scenarioChunks.join(',') as ExpositionUrlParameters
}

export function decodeUrlParameters<T extends Exposition<any>>(params: ExpositionUrlParameters): ExpositionValues<T> | undefined {
  const scenarioChunks = params.split(',')
  const values = scenarioChunks.reduce((accumulator, chunk) => {
    const [key, value] = chunk.split(':')

    return {
      ...accumulator,
      [key]: value,
    }
  }, {})

  return values as ExpositionValues<T>
}
