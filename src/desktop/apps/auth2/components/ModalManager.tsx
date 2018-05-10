import React, { Component } from 'react'
import { LoginModal } from '../components/LoginModal'
import { ResetPassword } from '../components/ResetPassword'
import { SignupModal } from '../components/SignUpModal'
import { ModalProps } from './Types'
const mediator = require('../../../lib/mediator')

export class ModalManager extends Component<null> {
  state = {
    currentType: null,
    currentModal: null, // this keeps track of the currently displayed modal
  }

  componentDidMount() {
    mediator.on('open:auth', options => {
      this.openModal(options.mode)
    })
  }

  openModal = type => {
    this.setState({
      currentType: type,
    })
  }

  closeModal = () => {
    this.setState({
      currentType: null,
    })
  }

  render() {
    const { currentType } = this.state

    let Modal: React.ComponentClass<ModalProps>

    if (!currentType) {
      return null
    }

    switch (currentType) {
      case 'login':
        Modal = LoginModal
        break
      case 'signup':
        Modal = SignupModal
        break
      case 'reset_password':
        Modal = ResetPassword
        break
      default:
        Modal = SignupModal
        break
    }

    return <Modal onTypeChange={this.openModal} onClose={this.closeModal} />
  }
}
