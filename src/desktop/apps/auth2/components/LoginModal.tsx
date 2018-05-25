import React, { Component } from 'react'
import { DesktopModal } from '@artsy/reaction/dist/Components/Authorization/DesktopModal'
import { LoginForm } from '@artsy/reaction/dist/Components/Authorization/LoginForm'
import { ModalProps } from './Types'
import fetch from 'isomorphic-fetch'
import { data as sd } from 'sharify'

interface LoginModalProps extends ModalProps {
  redirectUrl?: string
}

export class LoginModal extends Component<LoginModalProps> {
  loginUser(values) {
    fetch(sd.APP_URL + sd.AP.loginPagePath, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XAPP-TOKEN': sd.ARTSY_XAPP_TOKEN,
      },
      method: 'POST',
      body: JSON.stringify({
        // data: {
        _csrf: sd.CSRF_TOKEN,
        session_id: sd.SESSION_ID,
        ...values,
        // },
      }),
    }).then(() => {
      // window.location.href = this.props.redirectUrl || '/'
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
