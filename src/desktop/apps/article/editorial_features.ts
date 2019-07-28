import { find } from "lodash"

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
  const customArticle = find(customEditorialArticles, { id })
  if (customArticle) {
    return customArticle.name
  }
}
