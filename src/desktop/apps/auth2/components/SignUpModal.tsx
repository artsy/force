import React, { Component } from 'react'
import { DesktopModal } from '@artsy/reaction/dist/Components/Authorization/DesktopModal'
import { RegisterForm } from '@artsy/reaction/dist/Components/Authorization/RegisterForm'

interface Props {
  closeModal: () => void
}
export class SignupModal extends Component<Props, null> {
  render() {
    return (
      <DesktopModal show={true} onClose={this.props.closeModal}>
        <RegisterForm
          handleSubmit={values => {
            console.log('Form submitted', values)
          }}
          handleChangeMode={mode => _ => {
            console.log('New mode: ', mode)
          }}
          values={{}}
        />
      </DesktopModal>
    )
  }
}
