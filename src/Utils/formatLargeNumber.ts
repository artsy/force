export function formatLargeNumber(number: number, decimalPlaces = 0) {
  if (number < 1000) {
    return number.toString()
  }
  if (number < 1000000) {
    return `${(number / 1000).toFixed(decimalPlaces)}K`
  }
  if (number < 1000000000) {
    return `${(number / 1000000).toFixed(decimalPlaces)}M`
  }
  return `${(number / 1000000000).toFixed(decimalPlaces)}B`
}
