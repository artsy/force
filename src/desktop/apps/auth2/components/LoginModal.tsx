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
          handleTypeChange={type => this.props.onTypeChange(type)}
          values={{}}
        />
      </DesktopModal>
    )
  }
}
