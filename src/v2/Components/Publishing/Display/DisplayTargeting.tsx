import { ArticleData } from "v2/Components/Publishing/Typings"
import { data as sd } from "sharify"
import { get } from "v2/Utils/get"

export const targetingData = (article: ArticleData, pageType: string) => {
  const isTesting = sd.DEPLOY_ENV === "production" ? false : true

  return {
    is_testing: isTesting,
    page_type: pageType,
    post_id: article.id,
    tags: verticalTag(article),
  }
}

const verticalTag = (article: ArticleData) => {
  return get(article, a => a.vertical.name, "")
}

export const is300x50AdUnit = (unit: string): boolean => {
  return unit.slice(-3) === "x50"
}
