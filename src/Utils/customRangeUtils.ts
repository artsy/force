export type Numeric = number | "*"
export type CustomRange = Numeric[]
export const DEFAULT_RANGE = "*-*"
export const DEFAULT_PARSED_RANGE: CustomRange = ["*", "*"]

export const getRangeValue = (value: CustomRange[number]) => {
  return value === "*" || value === 0 ? "" : value
}

export const isCustomRangeValue = (value?: string) => value !== "*-*"
