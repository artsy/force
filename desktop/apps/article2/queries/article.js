import articleBody from 'desktop/apps/article2/queries/articleBody'
import sectionFragments from 'desktop/apps/article2/queries/sectionFragments'

export default function ArticleQuery (id) {
  return `
    {
      article(id: "${id}" ) {
        ${articleBody}
      }
      relatedArticles: articles(published: true, limit: 4, sort: "-published_at", featured: true) {
        thumbnail_title
        slug
        thumbnail_image
      }
    }
    ${sectionFragments}
  `
}
