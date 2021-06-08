/**
 * Computes title meta tage value for an artist
 */
export function computeTitle(name: string, count: number) {
  const parts = [
    name,
    "-",
    count ? count + " Artworks," : null,
    "Bio & Shows on Artsy",
  ]
  const titleString = parts.filter(Boolean).join(" ")
  return titleString
}
