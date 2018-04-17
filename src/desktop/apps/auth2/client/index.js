import React from 'react'
import { render } from 'react-dom'
import mediator from '../../../lib/mediator.coffee'

import LoginModal from '../components/LoginModal'
import SignupModal from '../components/SignUpModal'

export const open = (type = '') => {
  let Modal

  if (!type) {
    return
  }

  switch (type) {
    case 'login':
      Modal = LoginModal
      break
    case 'signup':
      Modal = SignupModal
      break
    case 'marketing':
    default:
      break
  }

  render(
    <Modal openedAt={new Date()} />,
    document.getElementById('modal-container')
  )
}

mediator.on('open:auth', (options) => {
  const { mode } = options
  if (mode) {
    open(mode)
  }
})
