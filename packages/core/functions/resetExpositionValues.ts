import type { Exposition } from '../@types/exposition'

/**
 * Reset the values of a given exposition `Exposition` ⏰
 *
 * @param exposition
 * @param scenariosToReset - selection of scenarios that should be resetted to their initial value
 * @returns `Exposition`
 * @example
  const exposition = createExposition({
    user: { options: ['Dio 🌎', 'JoJo 🌟'] },
  } as const)

  exposition.user.value = 'JoJo 🌟'

  const resettedExposition = resetExpositionValues(exposition)
  getExpositionValues(resettedExposition) // { user: "Dio 🌎" }
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
