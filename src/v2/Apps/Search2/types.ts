export interface ArtistSearch2Hit {
  alternate_names?: string[] | null
  featured_names?: string[] | null
  nationality?: string[]
  target_supply_priority?: number | null
  birth_year?: number | null
  follow_count?: number
  search_boost?: number
}

export interface FairSearch2Hit {
  city?: string | null
}

export interface ArticleSearch2Hit {
  author?: string
  description?: string
  tags?: string[]
  featured?: boolean
}

export interface AuctionSearch2Hit {
  start_at_i?: number
  start_at?: string
}

export interface ArtistSeriesSearch2Hit {
  keyword?: string | null
  category?: string | null
  search_boost?: number
}

export interface CollectionSearch2Hit {
  keyword?: string | null
  category?: string | null
  search_boost?: number
}

export interface ShowSearch2Hit {
  venue?: string
  city?: string | null
  active?: boolean
  has_location?: boolean
  search_boost?: number
}

export interface GallerySearch2Hit {
  name?: string
  alternate_names?: string[] | null
  featured_names?: string[] | null
  search_boost?: number
}

export interface Search2Hit
  extends ArtistSearch2Hit,
    FairSearch2Hit,
    ArticleSearch2Hit,
    AuctionSearch2Hit,
    ArtistSeriesSearch2Hit,
    CollectionSearch2Hit,
    ShowSearch2Hit,
    GallerySearch2Hit {
  name: string
  image_url: string | null
  href: string
  slug: string
}
