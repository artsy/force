import { articleBody } from "desktop/apps/article/queries/articleBody"
import { sectionFragments } from "desktop/apps/article/queries/sectionFragments"

export const newsArticlesQuery = ({ limit, offset }) => {
  return `
    query NewsArticlesQuery {
      articles(published: true, layout: "news", limit: ${limit ||
        50}, offset: ${offset || 0}, sort: "-published_at") {
        ${articleBody}
      }
    }
    ${sectionFragments}
  `
}

export const newsPanelQuery = () => {
  return `
    query NewsPanelQuery {
      articles(published: true, layout: "news", limit: 3, sort: "-published_at") {
        title
        slug
      }
    }
  `
}
