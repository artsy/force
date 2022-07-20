export type Metric = "in" | "cm"

export const DEFAULT_METRIC: Metric = "cm"
export const SUPPORTED_METRICS: Metric[] = ["cm", "in"]

export const getSupportedMetric = (metric: string = ""): Metric => {
  const metricFromParam = metric.toLowerCase() as Metric

  if (SUPPORTED_METRICS.includes(metricFromParam)) {
    return metricFromParam
  }

  return DEFAULT_METRIC
}
