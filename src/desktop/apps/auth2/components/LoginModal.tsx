import React, { Component } from 'react'
import { DesktopModal } from 'reaction/Components/Authorization/DesktopModal'
import { LoginForm } from 'reaction/Components/Authorization/LoginForm'

console.log(DesktopModal, LoginForm)

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
