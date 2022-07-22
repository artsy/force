import {
  SIZE_OPTIONS_IN_CENTIMETERS,
  SIZE_OPTIONS_IN_INCHES,
} from "./constants"
import { Metric } from "./types"

export const getPredefinedSizesByMetric = (metric: Metric) => {
  if (metric === "cm") {
    return SIZE_OPTIONS_IN_CENTIMETERS
  }

  return SIZE_OPTIONS_IN_INCHES
}
