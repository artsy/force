import App from 'desktop/apps/article2/components/App'
import { renderReactLayout } from 'desktop/components/react/utils/render_react_layout'
import positronql from 'desktop/lib/positronql.coffee'
import ArticleQuery from './queries/article'

export async function index (req, res, next) {
  const articleId = req.params.slug
  try {
    const data = await positronql({ query: ArticleQuery(articleId) })
    const article = data.articles[0]
    const layout = renderReactLayout({
      basePath: res.app.get('views'),
      blocks: {
        head: 'meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'article2',
        bodyClass: 'body-no-header body-no-margins'
      },
      data: {
        article
      }
    })
    res.send(layout)
  } catch (error) {
    next(error)
  }
}
