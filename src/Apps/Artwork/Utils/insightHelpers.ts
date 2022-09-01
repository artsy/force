export const formatSellThroughRate = (sellThroughRate: number | null) => {
  if (sellThroughRate === null) {
    return ""
  }

  // show up to 2 decimal places
  return `${Math.round(sellThroughRate * 10000) / 100}%`
}
