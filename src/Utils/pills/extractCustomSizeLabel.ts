import { ONE_IN_TO_CM } from "./constants"
import { Metric, Numeric } from "./types"

const inToCm = (inches: Numeric) => {
  if (inches === "*") {
    return inches
  }

  return Math.round(inches * ONE_IN_TO_CM)
}

/**
 * Accepts a string in the form: `"*-*"` | `"*-1"` | `"1-*"`| `"1-2"`
 * and returns a `Range`
 */
const parseRange = (range: string): Numeric[] => {
  return range.split("-").map(s => {
    if (s === "*") {
      return s
    }

    return parseFloat(s)
  })
}

/**
 * Accepts a value and it's input unit type and returns a localized conversion (or leaves it alone)
 */
const localizeDimension = (value: Numeric, unit: Metric) => {
  if (unit === "cm") {
    return inToCm(value)
  }

  return value
}

export const extractCustomSizeLabel = ({
  prefix,
  value,
  metric,
}: {
  prefix: string
  value: string
  metric: Metric
}) => {
  const range = parseRange(value)
  const min = localizeDimension(range[0], metric)
  const max = localizeDimension(range[1], metric)
  let label

  if (max === "*") {
    label = `from ${min}`
  } else if (min === "*") {
    label = `to ${max}`
  } else {
    label = `${min}-${max}`
  }

  return `${prefix}: ${label} ${metric.toLowerCase()}`
}
