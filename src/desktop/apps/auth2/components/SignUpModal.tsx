import React, { Component } from 'react'
import { DesktopModal } from '@artsy/reaction/dist/Components/Authorization/DesktopModal'
import { RegisterForm } from '@artsy/reaction/dist/Components/Authorization/RegisterForm'

export class SignupModal extends Component {
  state = {
    show: true,
  }

  onClose = () => this.setState({ show: false })

  render() {
    return (
      <DesktopModal show={this.state.show} onClose={this.onClose}>
        <RegisterForm
          handleSubmit={(values) => {
            console.log('Form submitted', values)
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
