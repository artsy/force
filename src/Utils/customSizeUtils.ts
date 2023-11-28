import { CustomRange, Numeric } from "Utils/customRangeUtils"
import { Metric } from "Utils/metrics"

export type CustomSize = {
  height: CustomRange
  width: CustomRange
}

const ONE_IN_TO_CM = 2.54

export const SIZES_IN_INCHES = [
  { displayName: "Small (under 16in)", name: "SMALL" },
  { displayName: "Medium (16in – 40in)", name: "MEDIUM" },
  { displayName: "Large (over 40in)", name: "LARGE" },
]

export const SIZES_IN_CENTIMETERS = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40 – 100cm)", name: "MEDIUM" },
  { displayName: "Large (over 100cm)", name: "LARGE" },
]

const convertToCentimeters = (element: number) => {
  return Math.round(element * ONE_IN_TO_CM)
}

const convertToInches = (value: number) => {
  return value / ONE_IN_TO_CM
}

const convertRangeToInches = (range: CustomRange) => {
  return range.map(value => {
    if (value === "*") {
      return value
    }

    return convertToInches(value)
  })
}

export const parseSizeRange = (
  range: string = "",
  metric: Metric
): Numeric[] => {
  return range.split("-").map(s => {
    if (s === "*") return s
    const value = parseFloat(s)

    if (metric === "cm") {
      return convertToCentimeters(value)
    }

    return value
  })
}

export const getCustomSizeRangeInInches = (
  customSize: CustomSize,
  sourceMetric: Metric
) => {
  let sizes = customSize

  if (sourceMetric === "cm") {
    sizes = {
      width: convertRangeToInches(customSize.width),
      height: convertRangeToInches(customSize.height),
    }
  }

  return {
    width: sizes.width.join("-"),
    height: sizes.height.join("-"),
  }
}

export const getPredefinedSizesByMetric = (metric: Metric) => {
  if (metric === "cm") {
    return SIZES_IN_CENTIMETERS
  }

  return SIZES_IN_INCHES
}
