import { renderLayout } from '@artsy/stitch'
import App from './components/App'

export const index = async (req, res, next) => {
  try {
    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_index.jade',
      config: {
        styledComponents: true
      },
      blocks: {
        head: 'templates/meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'experimental_auth_modal'
      }
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
