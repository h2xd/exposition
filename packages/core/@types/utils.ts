export type Readable<T extends Record<string, ReadonlyArray<string>>> = {
  /**
   * Unpack the values with [number] and pack them back into an Array.
   * By doing so we can remove the readonly flag on the given values.
   */
  [K in keyof T]: T[K][number][]
}
