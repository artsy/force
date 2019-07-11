import { articleBody } from "desktop/apps/article/queries/articleBody"
import { sectionFragments } from "desktop/apps/article/queries/sectionFragments"
import { relatedArticles } from "desktop/apps/article/queries/relatedArticles"

export default function ArticleQuery(id) {
  return `
    query ArticleQuery {
      article(id: "${id}") {
        ${articleBody}
        ${relatedArticles}
      }
    }
    ${sectionFragments}
  `
}
