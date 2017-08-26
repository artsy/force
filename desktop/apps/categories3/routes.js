import App from './components/App'
import GeneFamiliesQuery from './queries/geneFamilies'
import ReactDOM from 'react-dom/server'
import metaphysics from 'lib/metaphysics.coffee'
import { ServerStyleSheet } from 'styled-components'
import { renderLayout } from '@artsy/stitch'

export const index = async (req, res, next) => {
  try {
    const { gene_families: geneFamilies } = await metaphysics({
      query: GeneFamiliesQuery(),
      req: req
    })

    const layout = await renderLayout({
      basePath: req.app.get('views'),
      // config: {
      //   componentRenderer: (Component) => {
      //     const sheet = new ServerStyleSheet()
      //     const html = ReactDOM.renderToString(sheet.collectStyles(Component))
      //     return html
      //   }
      // },
      layout: '../../../components/main_layout/templates/react_index.jade',
      blocks: {
        head: 'meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'categories3'
      },
      data: {
        geneFamilies
      }
    })

    res.send(layout)
  } catch (err) {
    next(err)
  }
}
