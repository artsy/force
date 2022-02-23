export type Metric = "IN" | "CM"

export const DEFAULT_METRIC: Metric = "CM"
export const SUPPORTED_METRICS: Metric[] = ["CM", "IN"]

export const getSupportedMetric = (metric: string = ""): Metric => {
  if (metric && SUPPORTED_METRICS.includes(metric as Metric)) {
    return metric as Metric
  }

  return DEFAULT_METRIC
}
