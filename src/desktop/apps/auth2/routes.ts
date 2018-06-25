import { renderLayout } from '@artsy/stitch'
import { AuthStatic } from './components/AuthStatic'
import { ModalType } from '@artsy/reaction/dist/Components/Authentication/Types'
import { AuthenticationMeta } from './components/meta'
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
      type = ModalType.forgot
      break
    default:
      type = ModalType.login
      break
  }

  let title = ''
  switch (type) {
    case ModalType.login:
      title = 'Login to Artsy'
      break
    case ModalType.signup:
      title = 'Signup for Artsy'
      break
    case ModalType.forgot:
      title = 'Forgot Password'
      break
  }
  const meta = {
    description: '',
    title,
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

export const resetPassword = (req, res) => {
  if (req.query.reset_password_token) {
    req.session.reset_password_token = req.query.reset_password_token
    req.session.set_password = req.query.set_password
    req.session.reset_password_redirect_to =
      req.query.reset_password_redirect_to
    res.redirect('/reset_password2')
  } else {
    res.locals.sd.RESET_PASWORD_REDIRECT_TO =
      req.session.reset_password_redirect_to
    res.render('reset_password', {
      reset_password_token: req.session.reset_password_token,
      set_password: req.session.set_password,
    })
  }
}
