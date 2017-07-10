import App from 'desktop/apps/article2/components/App'
import { renderReactLayout } from 'desktop/components/react/utils/render_react_layout'
import positronql from 'desktop/lib/positronql.coffee'
import ArticleQuery from './queries/article'

export async function index (req, res, next) {
  const data = await positronql({ query: ArticleQuery(req.params.slug) })
  const article = data.articles[0]
  console.log(article)
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
      article: {}
    }
  })
  res.send(layout)
}
