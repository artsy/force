import { articleBody } from 'desktop/apps/article/queries/articleBody'
import { sectionFragments } from 'desktop/apps/article/queries/sectionFragments'

export const newsArticlesQuery = ({ limit, offset }) => {
  return `
    {
      articles(published: true, layout: "news", limit: ${limit ||
        50}, offset: ${offset || 0}, sort: "-published_at") {
        ${articleBody}
      }
    }
    ${sectionFragments}
  `
}
