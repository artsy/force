import App from 'desktop/apps/react_example/components/App'
import { renderLayout } from '@artsy/stitch'

export async function index(req, res, next) {
  try {
    const layout = await renderLayout({
      basePath: req.app.get('views'),
      layout: '../../../components/main_layout/templates/react_index.jade',
      blocks: {
        head: 'meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'react_example'
      },
      data: {
        name: 'Leif',
        description: 'hello hi how are you'
      },
      templates: {
        MyJadeView: 'myJadeView.jade'
      }
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
