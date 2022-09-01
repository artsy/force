export const formatSellThroughRate = (sellThroughRate: number | null) => {
  if (sellThroughRate === null) {
    return ""
  }

  const sellThroughRatePercentage = (sellThroughRate as number) * 100
  // show up to 2 decimal places
  return `${Math.round(sellThroughRatePercentage * 100) / 100}%`
}
