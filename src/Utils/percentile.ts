interface PercentileProps {
  values: number[]
  /** A fraction from 0 to 1, e.g. 0.9 for p90. */
  p: number
}

/** Linear interpolation between closest ranks (the numpy default); `p: 0.5` is the median. */
export const percentile = ({ values, p }: PercentileProps): number => {
  if (values.length === 0) {
    throw new Error("percentile needs at least one value")
  }
  const sorted = [...values].sort((x, y) => x - y)
  const rank = p * (sorted.length - 1)
  const lower = Math.floor(rank)
  const upper = Math.ceil(rank)
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (rank - lower)
}
