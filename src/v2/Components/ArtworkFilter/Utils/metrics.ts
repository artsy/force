export type Metric = "in" | "cm"

export const DEFAULT_METRIC: Metric = "cm"
export const SUPPORTED_METRICS: Metric[] = ["cm", "in"]

export const getSupportedMetric = (metric: string = ""): Metric => {
  const formattedMetric = metric.toLowerCase() as Metric

  if (SUPPORTED_METRICS.includes(formattedMetric)) {
    return formattedMetric
  }

  return DEFAULT_METRIC
}
