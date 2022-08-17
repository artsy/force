export interface ArtworkModel {
  artistName: string
  artistId: string
  category: string
  date: string
  title: string
  medium: string
  attributionClass: string | undefined
  editionNumber?: string
  editionSize?: string
  height: string
  width: string
  depth: string
  metric: string
  pricePaidDollars: string
  pricePaidCurrency: string
  provenance: string
  artworkLocation: string
  postalCode?: string
}
