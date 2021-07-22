import { EIGHT_FEET_CM, EIGHT_FEET_PX } from "./ViewInRoomScale"

export type Range = { min: number; max: number }

export const remap = (n: number, from: Range, to: Range) => {
  return ((n - from.min) * (to.max - to.min)) / (from.max - from.min) + to.min
}

export const cmToPx = (cm: number) =>
  remap(cm, { min: 0, max: EIGHT_FEET_CM }, { min: 0, max: EIGHT_FEET_PX })

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
