import { ArticleData } from "@artsy/reaction/dist/Components/Publishing/Typings"

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
    name: "EOY_2018_ARTISTS",
    id: "5bf30690d8b9430baaf6c6de",
  },
  {
    name: "EOY_2018_CULTURE",
    id: "5bf306aad8b9430baaf6c6df",
  },
  {
    name: "VANGUARD_2019",
    id: "5d2f8bd0cdc74b00208b7e16",
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
