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

export type Entity = {
  // TODO: Add Enum
  field: string
  value: any
  payload?: {
    [key: string]: any
    // TODO: Add TS type
    aggregation?: any
    // TODO: Add TS type
    metric?: any
    options?: OptionItem[]
  }
}
