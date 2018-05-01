import React, { Component } from 'react'
import { DesktopModal } from '@artsy/reaction/dist/Components/Authorization/DesktopModal'
import { LoginForm } from '@artsy/reaction/dist/Components/Authorization/LoginForm'

export class LoginModal extends Component {
  state = {
    show: true
  }

  onClose = () => this.setState({ show: false })

  render() {
    return (
      <DesktopModal show={this.state.show} onClose={this.onClose}>
        <LoginForm
          handleSubmit={() => {
            console.log('Form submitted')
          }}
          handleChangeMode={(mode) => (_) => {
            console.log('New mode: ', mode)
          }}
          values={{}}
        />
      </DesktopModal>
    )
  }
}
