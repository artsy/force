export type CustomRangeSegment = number | "*"
export type CustomRange = CustomRangeSegment[]

export const DEFAULT_CUSTOM_RANGE: CustomRange = ["*", "*"]
export const DEFAULT_PRICE_RANGE = "*-*"
export const DEFAULT_RANGE = [0, 50000]

export const PRICE_RANGE_FORMAT = /^(\*|\d+(\.\d+)?)-(\*|\d+(\.\d+)?)$/
