/**
 * Parses article metadata to determine correct category type for Google DFP ad placements.
 */

interface ArticleProperties {
  layout?: string
  tracking_tags?: [string]
  sponsor?: {
    pixel_tracking_code?: string
    partner_logo_link?: string
    partner_light_logo?: string
    partner_dark_logo?: string
    partner_condensed_logo?: string
  }
}

enum AdCategory {
  Feature = "feature",
  Article = "article",
  NewsLanding = "newslanding",
  SponsorLanding = "sponsorlanding",
  SponsorFeature = "sponsorfeature",
}

const isSponsored = (article: ArticleProperties) => {
  const { tracking_tags, sponsor } = article
  if (tracking_tags.includes("sponsored")) {
    return true
  }

  // tslint:disable:no-extra-boolean-cast
  // Check each of the properties of article.sponsor, if any are true then the article is sponsored.
  if (!!Reflect.get(sponsor, "partner_condensed_logo")) {
    return true
  }
  if (!!Reflect.get(sponsor, "partner_dark_logo")) {
    return true
  }
  if (!!Reflect.get(sponsor, "partner_light_logo")) {
    return true
  }
  if (!!Reflect.get(sponsor, "partner_logo_link")) {
    return true
  }
  if (!!Reflect.get(sponsor, "pixel_tracking_code")) {
    return true
  }
  return false
}

export const articleAdCategory = (article: ArticleProperties) => {
  let isNewsLanding = article.layout === "news"
  if (isNewsLanding) {
    return AdCategory.NewsLanding
  }

  let isFeature = article.layout === "feature" && !isSponsored(article)
  if (isFeature) {
    return AdCategory.Feature
  }

  let isSponsoredFeature = article.layout === "feature" && isSponsored(article)
  if (isSponsoredFeature) {
    return AdCategory.SponsorFeature
  }

  let isSponsoredLanding =
    (article.layout === "series" || article.layout === "video") &&
    isSponsored(article)
  if (isSponsoredLanding) {
    return AdCategory.SponsorLanding
  }

  return AdCategory.Article
}

/**
 * Example Articles
 *
 * News Landing: http://localhost:5000/news/artsy-editorial-eternal-beauty-botticelli-s-the-birth-venus-caused-man-heart-attack
 *
 * Sponsored Feature: http://localhost:5000/series/artsy-editors-newly-established
 *
 * Sponsored Landing (Series):  http://localhost:5000/series/artsy-vanguard
 *
 * Sponsored Landing (Video): http://localhost:5000/series/artsy-editors-future-art/artsy-editors-future-art-carrie-mae-weems
 *
 * Feature: http://localhost:5000/article/artsy-editorial-rise-fall-internet-art-communities or http://localhost:5000/article/artsy-editorial-inside-new-yorks-remaining-artists-housing
 *
 * Article: http://localhost:5000/article/artsy-editorial-malick-sidibephotographs-captured-moments-joy-liberation-mali
 */
