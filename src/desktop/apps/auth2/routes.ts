import { renderLayout } from '@artsy/stitch'
import { AuthStatic } from './components/AuthStatic'
import { ModalType } from '@artsy/reaction/dist/Components/Authentication/Types'
import { AuthenticationMeta } from './meta'

export const index = async (req, res, next) => {
  let type: ModalType
  switch (req.path) {
    case '/login':
      type = ModalType.login
      break
    case '/signup':
      type = ModalType.signup
      break
    case '/forgot':
      type = ModalType.resetPassword
      break
    default:
      type = ModalType.login
      break
  }

  const meta = {
    description: '',
    title: type === ModalType.login ? 'Login to Artsy' : 'Signup for Artsy',
  }
  const { action, destination, redirectTo } = req.query
  const options = { action, destination, redirectTo }

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
        options,
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
