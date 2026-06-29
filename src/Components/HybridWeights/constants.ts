export const DEFAULT_HYBRID_WEIGHTS = "0.3-0.7"

export const HYBRID_WEIGHTS_MIN = 0.1

export const HYBRID_WEIGHTS_MAX = 0.9

export const HYBRID_WEIGHTS_STEP = 0.1

export type HybridWeightsRange = [number, number]

export const parseHybridWeights = (value: string): HybridWeightsRange => {
  const [min, max] = value.split("-").map(Number)

  return [min, max]
}

export const joinHybridWeights = (range: HybridWeightsRange): string => {
  return range.join("-")
}

/** Rounds a float to a single decimal place, avoiding 0.1-step float drift. */
export const roundToStep = (value: number): number => {
  return Math.round(value * 10) / 10
}
