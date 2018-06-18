import { renderLayout } from '@artsy/stitch'
import { AuthStatic } from './components/AuthStatic'
import { ModalType } from '@artsy/reaction/dist/Components/Authentication/Types'
import { AuthenticationMeta } from './meta'
import { MobileAuthStatic } from './components/MobileAuthStatic'

export const index = async (req, res, next) => {
  let type: ModalType
  const template = res.locals.sd.IS_MOBILE ? MobileAuthStatic : AuthStatic

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
  const {
    afterSignUpAction,
    destination,
    redirectTo,
    signupIntent,
    signupReferer,
  } = req.query

  try {
    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_blank_index.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: AuthenticationMeta,
        body: template,
      },
      locals: {
        ...res.locals,
        assetPackage: 'auth2',
      },
      data: {
        type,
        meta,
        options: {
          afterSignUpAction,
          destination,
          redirectTo,
          signupIntent,
          signupReferer,
        },
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
