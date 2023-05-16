export interface PillType {
  displayName: string
  key: string
  searchEntityName?: string
}

export const TOP_PILL: PillType = {
  displayName: "Top",
  key: "top",
}

export const ARTWORKS_PILL: PillType = {
  displayName: "Artworks",
  key: "artwork",
  searchEntityName: "ARTWORK",
}

export const ARTIST_PILL: PillType = {
  displayName: "Artist",
  key: "artist",
  searchEntityName: "ARTIST",
}

export const ARTICLE_PILL: PillType = {
  displayName: "Article",
  key: "article",
  searchEntityName: "ARTICLE",
}

export const SALE_PILL: PillType = {
  displayName: "Sale",
  key: "sale",
  searchEntityName: "SALE",
}

export const ARTIST_SERIES_PILL: PillType = {
  displayName: "Artist Series",
  key: "artist_series",
  searchEntityName: "ARTIST_SERIES",
}

export const COLLECTION_PILL: PillType = {
  displayName: "Collection",
  key: "marketing_collection",
  searchEntityName: "COLLECTION",
}

export const FAIR_PILL: PillType = {
  displayName: "Fair",
  key: "fair",
  searchEntityName: "FAIR",
}

export const SHOW_PILL: PillType = {
  displayName: "Show",
  key: "partner_show",
  searchEntityName: "SHOW",
}

export const GALLERY_PILL: PillType = {
  displayName: "Gallery",
  key: "PartnerGallery",
  searchEntityName: "GALLERY",
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

export const SEARCH_DEBOUNCE_DELAY = 150
