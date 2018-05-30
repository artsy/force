import React, { Component } from 'react'
import { DesktopModal } from '@artsy/reaction/dist/Components/Authorization/DesktopModal'
import { LoginForm } from '@artsy/reaction/dist/Components/Authorization/LoginForm'
import { ModalProps } from './Types'
import fetch from 'isomorphic-fetch'
import { data as sd } from 'sharify'

interface LoginModalProps extends ModalProps {
  redirectUrl?: string
}

interface LoginModalState {
  error?: any
}

export class LoginModal extends Component<LoginModalProps, LoginModalState> {
  async loginUser(values, formikBag) {
    try {
      const res = await fetch(sd.APP_URL + sd.AP.loginPagePath, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          _csrf: sd.CSRF_TOKEN,
          session_id: sd.SESSION_ID,
          ...values,
        }),
      })
      console.log('Response headers: ', res.headers)
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.log(err)
      formikBag.setStatus(err)
    }
  }

  render() {
    return (
      <DesktopModal show={true} onClose={this.props.onClose}>
        <LoginForm
          handleSubmit={(values, formikBag) => {
            this.loginUser(values, formikBag)
          }}
          handleTypeChange={type => this.props.onTypeChange(type)}
          values={{}}
        />
      </DesktopModal>
    )
  }
}
