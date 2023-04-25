export interface PillType {
  indexName?: string
  displayName: string
  disabled?: boolean
  key: string
}

export const TOP_PILL: PillType = {
  displayName: "Top",
  key: "top",
}

export const ARTWORKS_PILL: PillType = {
  displayName: "Artworks",
  key: "artwork",
}

export const ARTIST_PILL: PillType = {
  displayName: "Artist",
  key: "artist",
}

export const ARTICLE_PILL: PillType = {
  displayName: "Article",
  key: "article",
}

export const SALE_PILL: PillType = {
  displayName: "Sale",
  key: "sale",
}

export const ARTIST_SERIES_PILL: PillType = {
  displayName: "Artist Series",
  key: "artist_series",
}

export const COLLECTION_PILL: PillType = {
  displayName: "Collection",
  key: "marketing_collection",
}

export const FAIR_PILL: PillType = {
  displayName: "Fair",
  key: "fair",
}

export const SHOW_PILL: PillType = {
  displayName: "Show",
  key: "partner_show",
}

export const GALLERY_PILL: PillType = {
  displayName: "Gallery",
  key: "PartnerGallery",
}

export const PILLS: PillType[] = [
  TOP_PILL,
  ARTWORKS_PILL,
  ARTIST_PILL,
  ARTICLE_PILL,
  SALE_PILL,
  ARTIST_SERIES_PILL,
  COLLECTION_PILL,
  FAIR_PILL,
  SHOW_PILL,
  GALLERY_PILL,
]
