import React, { Component } from 'react'
import { DesktopModal } from '@artsy/reaction/dist/Components/Authorization/DesktopModal'
import { LoginForm } from '@artsy/reaction/dist/Components/Authorization/LoginForm'
import { ModalProps } from './Types'

const LoggedOutUser = require('desktop/models/logged_out_user.coffee')

export class LoginModal extends Component<ModalProps> {
  loginUser(values) {
    const user = new LoggedOutUser()
    user.set({
      data: values,
      redirectTo: location.pathname,
    })
    user.login({
      success: () => {},
    })
  }

  render() {
    return (
      <DesktopModal show={true} onClose={this.props.onClose}>
        <LoginForm
          handleSubmit={values => {
            console.log('Form submitted', values)
            this.loginUser(values)
          }}
          handleTypeChange={type => this.props.onTypeChange(type)}
          values={{}}
        />
      </DesktopModal>
    )
  }
}
