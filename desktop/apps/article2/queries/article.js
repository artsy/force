import articleBody from 'desktop/apps/article2/queries/articleBody'
import sectionFragments from 'desktop/apps/article2/queries/sectionFragments'
import relatedArticles from 'desktop/apps/article2/queries/relatedArticles'

export default function ArticleQuery (id) {
  return `
    {
      article(id: "${id}" ) {
        ${articleBody}
        ${relatedArticles}
      }
    }
    ${sectionFragments}
  `
}
