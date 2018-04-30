import { renderLayout } from '@artsy/stitch'
import { App } from './components/App.tsx'

export const index = async (req, res, next) => {
  const mode = req.path.includes('login') ? 'login' : 'register'
  try {
    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_blank_index.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: 'templates/meta.jade',
        body: App,
      },
      locals: {
        ...res.locals,
        assetPackage: 'auth2',
      },
      data: {
        mode,
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
