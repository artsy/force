import { ArticleData } from "@artsy/reaction/dist/Components/Publishing/Typings"
import { slugify } from "underscore.string"

interface CustomArticle {
  name: string
  id: string
}

/**
 * Master list of articles that should be rendered
 * via Reaction's EditorialFeature component
 * https://github.com/artsy/reaction/blob/master/src/Components/Publishing/EditorialFeature
 */
const customEditorialArticles: CustomArticle[] = [
  {
    id: "5bf30690d8b9430baaf6c6de",
    name: "EOY_2018_ARTISTS",
  },
  {
    id: "5bf306aad8b9430baaf6c6df",
    name: "EOY_2018_CULTURE",
  },
  {
    id: "5d2f8bd0cdc74b00208b7e16",
    name: "VANGUARD_2019",
  },
]

/**
 * Checks if an article._id is included in customEditorialArticles
 */
export const isCustomEditorial = (id: string) => {
  const customArticle = customEditorialArticles.find(
    article => article.id === id
  )
  if (customArticle) {
    return customArticle.name
  }
}

/**
 * Returns the id of specified customEditorialArticle by name
 */
export const getCustomEditorialId = (name: string) => {
  const customArticle = customEditorialArticles.find(
    article => article.name === name
  )
  if (customArticle) {
    return customArticle.id
  }
}

export const VanguardSubSeries = [
  "5d1d01e03e7eba002037dc4c",
  "5d3defd1373e39001ff00644",
  "5d3def6b71e1480020dd7cb9",
]

export const isVanguardSubArticle = (article: ArticleData) => {
  return (
    article.seriesArticle &&
    (article.seriesArticle.id === getCustomEditorialId("VANGUARD_2019") ||
      VanguardSubSeries.includes(article.seriesArticle.id))
  )
}

export const getVanguardSubArticleContent = (
  path: any,
  article: ArticleData
) => {
  let subArticleContent
  const subArticleSlug = path.split("artsy-vanguard-2019/").pop()
  const { relatedArticles } = article

  if (!subArticleSlug.includes("artsy-vanguard-2019")) {
    relatedArticles &&
      relatedArticles.forEach(series => {
        if (subArticleSlug === slugify(series.title)) {
          subArticleContent = series
        }
        series.relatedArticles &&
          series.relatedArticles.map(artist => {
            if (subArticleSlug === slugify(artist.title)) {
              subArticleContent = artist
            }
          })
      })
  }
  return subArticleContent
}
