/**
 * @vitest-environment happy-dom
 */
import { createExposition, getExpositionValues } from '@exposition/core'
import { decodeUrlParameters, encodeUrlParameters } from './location'

it('should create URL save parameters', () => {
  const exposition = createExposition({
    cart: {
      options: ['empty', 'filled'],
    },
    location: {
      options: ['Australia', 'Europe'],
    },
  })

  expect(encodeUrlParameters(exposition)).toEqual('cart:empty,location:Australia')
})

it('should be able to parse given URL parameters', () => {
  const exposition = createExposition({
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
