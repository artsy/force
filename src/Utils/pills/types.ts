export type Numeric = number | "*"
export type Metric = "in" | "cm"

export type Pill = {
  isDefault?: boolean
  value: string
  displayValue: string
  field: string
}

export type OptionItem = {
  displayName: string
  value: string
}

export type Aggregation = {
  slice: string
  counts: Array<{
    count: number
    value: string
    name: string
  }>
}

export type Entity = {
  // TODO: Add Enum?
  field: string
  value: any
  payload?: {
    [key: string]: any
    aggregation?: Aggregation
    metric?: Metric
    options?: OptionItem[]
  }
}
