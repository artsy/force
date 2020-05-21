export type ArticleLayout =
  | "classic"
  | "feature"
  | "series"
  | "standard"
  | "video"
  | "news"

export enum ArticleAdType {
  Feature = "feature",
  Article = "article",
  NewsLanding = "newslanding",
  SponsorLanding = "sponsorlanding",
  SponsorFeature = "sponsorfeature",
}

export enum AdUnit {
  Desktop_TopLeaderboard = "Desktop_TopLeaderboard",
  Desktop_RightRail1 = "Desktop_RightRail1",
  Desktop_InContentLB2 = "Desktop_InContentLB2",

  Desktop_NewsLanding_Leaderboard1 = "Desktop_Leaderboard1",
  Desktop_NewsLanding_Leaderboard2 = "Desktop_Leaderboard2",
  Desktop_NewsLanding_LeaderboardRepeat = "Desktop_LeaderboardRepeat",

  Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom = "Desktop_InContentLB2",
  Desktop_Feature_Leaderboard1 = "Desktop_Leaderboard1",
  Desktop_Feature_Leaderboard2 = "Desktop_Leaderboard2",
  Desktop_Feature_LeaderboardRepeat = "Desktop_LeaderboardRepeat",

  Mobile_TopLeaderboard = "Mobile_TopLeaderboard",
  Mobile_InContentMR1 = "Mobile_InContentMR1",
  Mobile_InContentMR2 = "Mobile_InContentMR2",
  Mobile_InContentLB1 = "Mobile_InContentLB1",
  Mobile_InContentLB2 = "Mobile_InContentLB2",

  Mobile_NewsLanding_InContent1 = "Mobile_InContentMR1",
  Mobile_NewsLanding_InContent2 = "Mobile_InContentMR2",
  Mobile_NewsLanding_InContent3 = "Mobile_InContentMRRepeat",

  Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom = "Mobile_InContentLB2",
  Mobile_Feature_InContentLeaderboard1 = "Mobile_InContentLB1",
  Mobile_Feature_InContentLeaderboard2 = "Mobile_InContentLB2",
  Mobile_Feature_InContentLeaderboard3 = "Mobile_InContentLBRepeat",
}

export enum AdDimension {
  Desktop_TopLeaderboard = "970x250",
  Desktop_RightRail1 = "300x250",
  Desktop_InContentLB2 = "970x250",
  Desktop_NewsLanding_Leaderboard1 = "970x250",
  Desktop_NewsLanding_Leaderboard2 = "970x250",
  Desktop_NewsLanding_LeaderboardRepeat = "970x250",
  Mobile_Feature_InContentLeaderboard1 = "300x50",
  Mobile_Sponsored_Feature_InContentLeaderboard1 = "300x250",
  Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom = "970x250",
  Mobile_TopLeaderboard = "300x50",
  Mobile_InContentMR1 = "300x50",
  Mobile_InContentMR2 = "300x250",
  Mobile_InContentLB1 = "300x50",
  Mobile_InContentLB2 = "300x50",
  Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom = "300x250",
  Mobile_NewsLanding_InContent1 = "300x50",
  Mobile_NewsLanding_InContent2 = "300x50",
  Mobile_NewsLanding_InContent3 = "300x50",
}

export type SectionLayout =
  | "blockquote"
  | "column_width"
  | "fillwidth"
  | "full"
  | "mini"
  | "overflow_fillwidth"

export type BylineLayout = "fullscreen" | "condensed" | "standard" | "split"

export type DateFormat =
  | "condensed"
  | "monthYear"
  | "monthDay"
  | "news"
  | "verbose"
  | "default"

// TODO: Make some of these non-optional ;)
export interface ArticleData {
  id: string
  layout?: ArticleLayout
  authors?: any
  postscript?: string
  date?: string
  published_at?: string
  lead_paragraph?: string
  sections?: SectionData[]
  series?: {
    description?: string
    sub_title?: string
  }
  news_source?: {
    title?: string
    url?: string
  }
  [x: string]: any
  tracking_tags?: string[]
  sponsor?: {
    pixel_tracking_code?: string
    partner_logo_link?: string
    partner_light_logo?: string
    partner_dark_logo?: string
    partner_condensed_logo?: string
  }
  shouldAdRender?: boolean
  partner?: ArticlePartner
  sale?: ArticleSale
}

export type SectionType =
  | "image_collection"
  | "image" // TODO: to be deprecated
  | "image_set"
  | "embed"
  | "social_embed"
  | "slideshow" // TODO: to be deprecated
  | "text"
  | "video"
  | "default"

export interface SectionData {
  type: SectionType
  layout?: SectionLayout
  images?: ImagesData
  body?: string
  url?: string
  caption?: string
  cover_image_url?: string
  title?: string
  mobile_height?: number
  height?: number
}

export type ImagesData = ImageData[]

export interface ImageData {
  artist?: GravityEntity
  artists?: GravityEntity[]
  caption?: string
  credit?: string
  date?: string
  height: number
  id?: string
  index?: number
  image?: string
  setTitle?: string
  title?: string
  type?: string
  url?: string
  partner?: GravityEntity
  slug?: string
  width: number
}

export interface GravityEntity {
  name?: string
  slug?: string
}

export interface MediaData {
  url?: string
  cover_image_url?: string
  duration?: number
  release_date?: string
  published?: boolean
  description?: string
  credits?: string
}

export interface RelatedArticlePanelData {
  id: string
  layout: ArticleLayout
  slug: string
  thumbnail_title: string
  thumbnail_image: string
}

export interface RelatedArticleCanvasData {
  authors?: any[]
  contributing_authors?: any[]
  id: string
  layout: ArticleLayout
  published_at: string
  slug: string
  thumbnail_title: string
  thumbnail_image: string
}

export interface ArticleSale {
  id: string
  name: string
  href: string
  cover_image?: {
    cropped: {
      url: string
    }
  }
}

export interface ArticlePartner {
  default_profile_id: string
  name: string
  type: string
  profile: {
    id: string
    href: string
    image?: {
      cropped: {
        url: string
      }
    }
  }
}
