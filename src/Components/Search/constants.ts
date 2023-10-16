import { ContextModule } from "@artsy/cohesion"

export interface PillType {
  displayName: string
  key: string
  searchEntityName?: string
  analyticsContextModule: ContextModule
}

export const TOP_PILL: PillType = {
  displayName: "Top",
  key: "top",
  analyticsContextModule: ContextModule.topTab,
}

export const ARTWORKS_PILL: PillType = {
  displayName: "Artworks",
  key: "artwork",
  searchEntityName: "ARTWORK",
  analyticsContextModule: ContextModule.artworksTab,
}

export const ARTIST_PILL: PillType = {
  displayName: "Artist",
  key: "artist",
  searchEntityName: "ARTIST",
  analyticsContextModule: ContextModule.artistsTab,
}

export const ARTICLE_PILL: PillType = {
  displayName: "Article",
  key: "article",
  searchEntityName: "ARTICLE",
  analyticsContextModule: ContextModule.articleTab,
}

export const SALE_PILL: PillType = {
  displayName: "Auction",
  key: "sale",
  searchEntityName: "SALE",
  analyticsContextModule: ContextModule.auctionTab,
}

export const ARTIST_SERIES_PILL: PillType = {
  displayName: "Artist Series",
  key: "artist_series",
  searchEntityName: "ARTIST_SERIES",
  analyticsContextModule: ContextModule.artistSeriesTab,
}

export const COLLECTION_PILL: PillType = {
  displayName: "Collection",
  key: "marketing_collection",
  searchEntityName: "COLLECTION",
  analyticsContextModule: ContextModule.marketingCollectionTab,
}

export const FAIR_PILL: PillType = {
  displayName: "Fair",
  key: "fair",
  searchEntityName: "FAIR",
  analyticsContextModule: ContextModule.fairTab,
}

export const SHOW_PILL: PillType = {
  displayName: "Show",
  key: "partner_show",
  searchEntityName: "SHOW",
  analyticsContextModule: ContextModule.showTab,
}

export const GALLERY_PILL: PillType = {
  displayName: "Gallery",
  key: "PartnerGallery",
  searchEntityName: "GALLERY",
  analyticsContextModule: ContextModule.galleryTab,
}

export const PILLS: PillType[] = [
  TOP_PILL,
  ARTWORKS_PILL,
  ARTIST_PILL,
  GALLERY_PILL,
  ARTICLE_PILL,
  SALE_PILL,
  ARTIST_SERIES_PILL,
  COLLECTION_PILL,
  FAIR_PILL,
  SHOW_PILL,
]

export const SEARCH_DEBOUNCE_DELAY = 150
