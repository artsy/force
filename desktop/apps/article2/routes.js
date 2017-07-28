import App from 'desktop/apps/article2/components/App'
import { renderReactLayout } from 'desktop/components/react/utils/renderReactLayout'
import positronql from 'desktop/lib/positronql.coffee'
import ArticleQuery from './queries/article'

export async function index (req, res, next) {
  const articleId = req.params.slug
  try {
    const data = await positronql({ query: ArticleQuery(articleId) })
    const article = data.article
    if (articleId !== article.slug) {
      return res.redirect(`/article2/${article.slug}`)
    }
    // TODO: Redirects for partner (make the url in Writer) and channel and fair (should preview a classic)
    const layout = renderReactLayout({
      basePath: res.app.get('views'),
      blocks: {
        head: 'meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'article2',
        bodyClass: 'body-no-margins'
      },
      data: {
        article
      },
      styledComponent: true
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
