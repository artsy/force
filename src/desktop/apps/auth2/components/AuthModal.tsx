import React, { Component } from 'react'
import { LoginModal } from '../components/LoginModal'
import { SignupModal } from '../components/SignUpModal'

interface Props {
  mode?: string
}

export class AuthModal extends Component<Props> {
  render() {
    const { mode } = this.props
    let Modal

    if (!mode) {
      return
    }

    switch (mode) {
      case 'login':
        Modal = LoginModal
        break
      case 'signup':
        Modal = SignupModal
        break
      default:
        Modal = SignupModal
        break
    }

    return (
      <Modal />
    )
  }
}
