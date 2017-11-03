import articleBody from 'desktop/apps/article/queries/articleBody'
import sectionFragments from 'desktop/apps/article/queries/sectionFragments'
import relatedArticles from 'desktop/apps/article/queries/relatedArticles'
import { display, displayFragment } from 'desktop/apps/article/queries/display'

export default function ArticleQuery (id) {
  return `
    {
      article(id: "${id}") {
        ${articleBody}
        ${relatedArticles}
        ${display}
      }
    }
    ${displayFragment}
    ${sectionFragments}
  `
}
