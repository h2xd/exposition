/**
 * @vitest-environment happy-dom
 */
import { createExpositionState, getExpositionValues } from '@exposition/sdk'
import { decodeUrlParameters, encodeUrlParameters } from './location'

it('should create URL save parameters', () => {
  const exposition = createExpositionState({
    cart: {
      options: ['empty', 'filled'],
    },
    location: {
      options: ['Australia', 'Europe'],
    },
  })

  expect(encodeUrlParameters(exposition)).not.toBe(JSON.stringify(getExpositionValues(exposition)))
})

it('should be able to parse given URL parameters', () => {
  const exposition = createExpositionState({
    cart: {
      options: ['empty', 'filled'],
    },
    location: {
      options: ['Australia', 'Europe'],
    },
  })

  const urlParameters = encodeUrlParameters(exposition)
  const parsedParameters = decodeUrlParameters(urlParameters)

  expect(parsedParameters).toEqual(getExpositionValues(exposition))
})
