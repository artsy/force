import { ModalType } from '@artsy/reaction/dist/Components/Authentication/Types'

const mediator = require('../../lib/mediator.coffee')
const LoggedOutUser = require('../../models/logged_out_user.coffee')

export const handleSubmit = (type: ModalType, values, formikBag) => {
  const user = new LoggedOutUser()
  user.set(values)

  const options = {
    success: () => {
      formikBag.setSubmitting(false)
      window.location = '/' as any
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
