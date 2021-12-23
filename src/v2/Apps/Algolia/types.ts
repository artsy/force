export interface ArtistAlgoliaHit {
  alternate_names: string[] | null
  featured_names: string[] | null
  nationality: string[]
  target_supply_priority: number | null
  birth_year: number | null
  follow_count: number
  search_boost: number
}

export interface FairAlgoliaHit {
  city: string | null
}

export interface ArticleAlgoliaHit {
  author: string
  description: string
  tags: string[]
  featured: boolean
}

export interface AuctionAlgoliaHit {
  start_at_i: number
  start_at: string
}

export interface ArtistSeriesAlgoliaHit {
  keyword: string | null
  category: string | null
  search_boost: number
}

export interface CollectionAlgoliaHit {
  keyword: string | null
  category: string | null
  search_boost: number
}

export interface ShowAlgoliaHit {
  venue: string
  city: string | null
  active: boolean
  has_location: boolean
  search_boost: number
}

export interface GalleryAlgoliaHit {
  name: string
  alternate_names: string[] | null
  featured_names: string[] | null
  search_boost: number
}

export interface AlgoliaHit
  extends ArtistAlgoliaHit,
    FairAlgoliaHit,
    ArticleAlgoliaHit,
    AuctionAlgoliaHit,
    ArtistSeriesAlgoliaHit,
    CollectionAlgoliaHit,
    ShowAlgoliaHit,
    GalleryAlgoliaHit {
  name: string
  image_url: string | null
  href: string
  slug: string
}
