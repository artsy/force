/**
 * Computes title meta tag value for an artist
 */
export function computeTitle(
  name: string,
  count: number,
  forSaleOnly: boolean = false
) {
  if (count > 0) {
    return `${name} - ${count} ${count === 1 ? "Artwork" : "Artworks"}${
      forSaleOnly ? " for Sale on Artsy" : ", Bio & Shows on Artsy"
    }`
  } else {
    return `${name} - Bio & Shows on Artsy`
  }
}
