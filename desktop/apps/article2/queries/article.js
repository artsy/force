import articleBody from 'desktop/apps/article2/queries/articleBody'
import sectionFragments from 'desktop/apps/article2/queries/sectionFragments'

export default function ArticleQuery (id) {
  return `
    {
      article(id: "${id}" ) {
        ${articleBody}
      }
      relatedArticles: articles(published: true, limit: 3) {
        thumbnail_title
        slug
        thumbnail_image
      }
    }
    ${sectionFragments}
  `
}
