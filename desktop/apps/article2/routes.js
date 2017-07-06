import App from 'desktop/apps/article2/components/App'
import { renderReactLayout } from 'desktop/components/react/utils/render_react_layout'
import positronql from 'desktop/lib/positronql.coffee'
import ArticleQuery from './queries/article'

export async function index (req, res, next) {
  console.log(req.params.slug)
  console.log(ArticleQuery(req.params.slug))
  const { articles } = await positronql({ query: ArticleQuery(req.params.slug) })
  console.log(articles)

  const layout = renderReactLayout({
    basePath: req.app.get('views'),
    blocks: {
      head: 'meta.jade',
      body: App
    },
    locals: {
      ...res.locals,
      assetPackage: 'article2'
    },
    data: {
      article: articles
    }
  })
  res.send(layout)
}
