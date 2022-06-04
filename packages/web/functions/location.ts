import type { Exposition } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'
import type { ExpositionValues } from '../../core/dist'

type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName }

type ExpositionUrlData = Distinct<string, 'UrlParameters'>

export function encodeUrlParameters<T extends Exposition<any>>(exposition: T): ExpositionUrlData {
  const values = getExpositionValues(exposition)
  const stringifiedValues = JSON.stringify(values)

  return window.encodeURIComponent(stringifiedValues) as ExpositionUrlData
}

export function decodeUrlParameters<T extends Exposition<any>>(data: ExpositionUrlData): ExpositionValues<T> | undefined {
  const stringifiedValues = window.decodeURIComponent(data)
  const values = JSON.parse(stringifiedValues)

  return values as ExpositionValues<T>
}
