import { articleBody } from "desktop/apps/article/queries/articleBody"
import { sectionFragments } from "desktop/apps/article/queries/sectionFragments"
import {
  relatedArticles,
  relatedArticlesNews,
} from "desktop/apps/article/queries/relatedArticles"

export const articlesQuery = ({ offset, limit, channel, omit }) => {
  return `
    {
      articles(
        published: true,
        channel_id: "${channel}",
        limit: ${limit},
        offset: ${offset},
        featured: true,
        sort: "-published_at",
        omit: ["${omit}"],
        layout: "standard"
      ) {
        ${articleBody}
        ${relatedArticles}
      }
    }
    ${sectionFragments}
  `
}

export const newsArticlesQuery = ({ offset, limit, omit }) => {
  return `
    {
      articles(published: true, layout: "news", limit: ${limit}, offset: ${offset}, sort: "-published_at", omit: ["${omit}"]) {
        ${articleBody}
      }
      relatedArticlesCanvas: ${relatedArticlesNews(offset, limit)}
    }
    ${sectionFragments}
  `
}
