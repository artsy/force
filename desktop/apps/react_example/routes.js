import renderReactLayout from 'desktop/components/react/utils/render_react_layout'
import App from 'desktop/apps/react_example/components/App'

export function index (req, res, next) {
  const layout = renderReactLayout({
    basePath: req.app.get('views'),
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
      MyJadeView: 'my_jade_view.jade'
    }
  })

  res.send(layout)
}
