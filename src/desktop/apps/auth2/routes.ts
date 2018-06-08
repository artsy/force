import { renderLayout } from '@artsy/stitch'
import { AuthStatic } from './components/AuthStatic'
import { AuthenticationMeta } from './meta'

export const index = async (req, res, next) => {
  let type
  switch (req.path) {
    case '/login':
      type = 'login'
      break
    case '/signup':
      type = 'register'
      break
    case '/reset_password':
      type = 'reset_password'
      break
    default:
      type = 'login'
      break
  }

  const meta = {
    description: '',
    title: type === 'login' ? 'Login to Artsy' : 'Signup for Artsy',
  }

  try {
    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_blank_index.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: AuthenticationMeta,
        body: AuthStatic,
      },
      locals: {
        ...res.locals,
        assetPackage: 'auth2',
      },
      data: {
        type,
        meta,
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
