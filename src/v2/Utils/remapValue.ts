type Range = { min: number; max: number }

/**
 * Remaps a value from within one range to its corresponding value in another range.
 * E.g. convert between units or proportionally scale a value.
 *
 * @param n A numeric value
 * @param from Range the value comes from
 * @param to Range you wish to remap the value onto
 * @returns The remapped numeric value
 */
export const remapValue = (n: number, from: Range, to: Range) => {
  return ((n - from.min) * (to.max - to.min)) / (from.max - from.min) + to.min
}
