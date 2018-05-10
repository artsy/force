import React, { Component } from 'react'
import { DesktopModal } from '@artsy/reaction/dist/Components/Authorization/DesktopModal'
import { LoginForm } from '@artsy/reaction/dist/Components/Authorization/LoginForm'
import { ModalProps } from './Types'

export class LoginModal extends Component<ModalProps> {
  render() {
    return (
      <DesktopModal show={true} onClose={this.props.onClose}>
        <LoginForm
          handleSubmit={() => {
            console.log('Form submitted')
          }}
          handleChangeMode={e => {
            this.props.onTypeChange(e === 'reset_password' ? e : 'signup')
          }}
          values={{}}
        />
      </DesktopModal>
    )
  }
}
