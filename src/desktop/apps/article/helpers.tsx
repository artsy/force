import { isCustomEditorial } from "./editorial_features"
const { stringifyJSONForWeb } = require("desktop/components/util/json.coffee")
const Article = require("desktop/models/article")

// Helper method to determine how frequently ads should be rendered in Article components
export const shouldAdRender = (
  index: number,
  startIndex: number,
  frequency: number,
  articleType: string | null = null,
  isEigen: boolean = false
): boolean => {
  if (isEigen) {
    return false
  }

  // for Featured and Standard articles always return true
  if (articleType === "feature" || articleType === "standard") {
    return true
  }

  let position = index - startIndex
  return Math.abs(position) % frequency === 0
}

export const getBodyClass = article => {
  let bodyClass = "body-article body-no-margins"
  const isSuper = article.is_super_article || article.is_super_sub_article
  const isFullscreen =
    article.hero_section && article.hero_section.type === "fullscreen"

  if ((isSuper && isFullscreen) || isCustomEditorial(article.id)) {
    bodyClass = bodyClass + " body-no-header"
  }
  return bodyClass
}

export const isUnpublishedVideo = article => {
  return article.layout === "video" && article.media && !article.media.published
}

export const getLayoutTemplate = article => {
  const isFeatureInSeries =
    article.seriesArticle &&
    article.layout === "feature" &&
    article.hero_section &&
    article.hero_section.type === "fullscreen"

  const hasSeriesNav =
    ["series", "video"].includes(article.layout) || isFeatureInSeries

  let layoutTemplate =
    "../../../components/main_layout/templates/react_index.jade"

  if (hasSeriesNav) {
    layoutTemplate =
      "../../../components/main_layout/templates/react_blank_index.jade"
  }
  return layoutTemplate
}

export const getSuperArticleTemplates = article => {
  let templates
  if (article.is_super_article || article.is_super_sub_article) {
    templates = {
      SuperArticleFooter:
        "../../../components/article/templates/super_article_footer.jade",
      SuperArticleHeader:
        "../../../components/article/templates/super_article_sticky_header.jade",
    }
  }
  return templates
}

export const getJsonLd = article => {
  const articleModel = new Article(article)
  return stringifyJSONForWeb(articleModel.toJSONLD())
}
