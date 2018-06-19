import Cookies from 'cookies-js'
import {
  ModalType,
  ModalOptions,
} from '@artsy/reaction/dist/Components/Authentication/Types'
import { data as sd } from 'sharify'
import { pickBy, identity } from 'lodash'

const mediator = require('../../lib/mediator.coffee')
const LoggedOutUser = require('../../models/logged_out_user.coffee')

export const handleSubmit = (
  type: ModalType,
  modalOptions: ModalOptions,
  values,
  formikBag
) => {
  const user = new LoggedOutUser()
  const {
    contextModule,
    copy,
    destination,
    redirectTo,
    intent,
    signupReferer,
    trigger,
    triggerSeconds,
  } = modalOptions

  const userAttributes = Object.assign({}, values, {
    _csrf: sd.CSRF_TOKEN,
    signupIntent: intent,
    signupReferer,
  })

  user.set(userAttributes)

  const options = {
    success: (_, res) => {
      formikBag.setSubmitting(false)
      if (window.analytics) {
        const properties = {
          action:
            type === 'signup' ? 'Created account' : 'Successfully logged in',
          user_id: res.user && res.user.id,
          trigger,
          trigger_seconds: triggerSeconds,
          intent,
          context_module: contextModule,
          modal_copy: copy,
          auth_redirect: redirectTo || destination,
        }
        window.analytics.track(pickBy(properties, identity))
      }

      const defaultRedirect = type === 'signup' ? '/personalize' : '/'
      window.location = modalOptions.redirectTo || (defaultRedirect as any)
    },
    error: (_, res) => {
      const error = res.responseJSON
      formikBag.setStatus(error)
      formikBag.setSubmitting(false)
      mediator.trigger('auth:error', error.message)
    },
  }
  switch (type) {
    case ModalType.login:
      user.login(options)
      break
    case ModalType.signup:
      user.signup(options)
      break
  }
}

export const setCookies = options => {
  const { afterSignUpAction, destination } = options

  if (afterSignUpAction) {
    Cookies.set('afterSignUpAction', JSON.stringify(afterSignUpAction))
  }

  if (destination) {
    Cookies.set('destination', destination, {
      expires: 60 * 60 * 24,
    })
  }
}
