import type { ExpositionState } from './@types/exposition'

/**
 * Reset the values of a given `Exposition` to their initialValue. ⏰
 *
 * @param expositionState
 * @param scenariosToReset - selection of scenarios that should be reverted to their initial value
 * @returns `ExpositionState`
 * @example
  const expositionState = createExpositionState({
    character: { options: ['Dio 🌎', 'JoJo 🌟'] },
  } as const)

  const updatedExposition = updateExpositionValues(
    expositionState,
    { character: 'JoJo 🌟' }
  )
  getExpositionValues(updatedExposition) // { character: "JoJo 🌟" }

  const revertedExposition = resetExpositionValues(updatedExposition)
  getExpositionValues(revertedExposition) // { character: "Dio 🌎" }
 */
export function resetExpositionValues<T extends ExpositionState<any>>(expositionState: T, scenariosToReset: (keyof T)[] = []): T {
  return Object.keys(expositionState).reduce((accumulator, key) => {
    const shouldReset = scenariosToReset.length === 0 || scenariosToReset.includes(key)

    return {
      ...accumulator,
      [key]: {
        ...expositionState[key],
        value: shouldReset ? expositionState[key].initialValue : expositionState[key].value,
      },
    }
  }, {} as T)
}
