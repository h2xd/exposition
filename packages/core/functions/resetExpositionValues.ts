import type { Exposition } from '../@types/exposition'

/**
 * Reset the values of a given `Exposition` to their initialValue. ⏰
 *
 * @param exposition
 * @param scenariosToReset - selection of scenarios that should be reverted to their initial value
 * @returns `Exposition`
 * @example
  const exposition = createExposition({
    character: { options: ['Dio 🌎', 'JoJo 🌟'] },
  } as const)

  const updatedExposition = updateExpositionValues(
    exposition,
    { character: 'JoJo 🌟' }
  )
  getExpositionValues(updatedExposition) // { character: "JoJo 🌟" }

  const revertedExposition = resetExpositionValues(updatedExposition)
  getExpositionValues(revertedExposition) // { character: "Dio 🌎" }
 */
export function resetExpositionValues<TExposition extends Exposition<any>>(exposition: TExposition, scenariosToReset: (keyof TExposition)[] = []): TExposition {
  return Object.keys(exposition).reduce((accumulator, key) => {
    const shouldReset = scenariosToReset.length === 0 || scenariosToReset.includes(key)

    return {
      ...accumulator,
      [key]: {
        ...exposition[key],
        value: shouldReset ? exposition[key].initialValue : exposition[key].value,
      },
    }
  }, {} as TExposition)
}
