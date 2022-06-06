import type { Exposition } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'
import type { ExpositionValues } from '../../core/dist'

type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName }

type ExpositionUrlData = Distinct<string, 'UrlParameters'>

/**
 * Extract URL safe values from the current exposition state
 * @public
 * @param exposition - values that should be used for the UrlData
 * @returns
 *
 * @example
 const exposition = createExposition({
    auth: {
      options: ['valid ✅', 'deny ❌']
    }
  } as const)

  encodeUrlParameters(exposition)
 */
export function encodeUrlParameters<T extends Exposition<any>>(exposition: T): ExpositionUrlData {
  const values = getExpositionValues(exposition)
  const stringifiedValues = JSON.stringify(values)

  return window.encodeURIComponent(stringifiedValues) as ExpositionUrlData
}

/**
 * Decode the ExpositionValues from a given UrlParameters data set
 * @public
 * @param data - data that got extracted from window.location.query
 * @returns
 *
 * @example
  const values = decodeUrlParameters(...data)

  exposition = setExpositionValues(exposition, values)
 */
export function decodeUrlParameters<T extends Exposition<any>>(data: ExpositionUrlData): ExpositionValues<T> | undefined {
  const stringifiedValues = window.decodeURIComponent(data)
  const values = JSON.parse(stringifiedValues)

  return values as ExpositionValues<T>
}
