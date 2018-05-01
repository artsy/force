import { renderLayout } from '@artsy/stitch'
import { AuthStatic } from './components/AuthStatic.tsx'

export const index = async (req, res, next) => {
  let mode
  switch (req.path) {
    case '/login':
      mode = 'login'
      break
    case '/signup':
      mode = 'register'
      break
    case '/reset_password':
      mode = 'reset_password'
      break
    default:
      mode = 'login'
      break
  }

  try {
    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_blank_index.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: 'templates/meta.jade',
        body: AuthStatic,
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
