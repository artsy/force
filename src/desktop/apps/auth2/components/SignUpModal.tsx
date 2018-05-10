import React, { Component } from 'react'
import { DesktopModal } from '@artsy/reaction/dist/Components/Authorization/DesktopModal'
import { RegisterForm } from '@artsy/reaction/dist/Components/Authorization/RegisterForm'
import { ModalProps } from './Types'

export class SignupModal extends Component<ModalProps> {
  render() {
    return (
      <DesktopModal show={true} onClose={this.props.onClose}>
        <RegisterForm
          handleSubmit={values => {
            console.log('Form submitting:', values)
          }}
          handleTypeChange={type => this.props.onTypeChange(type)}
          values={{}}
        />
      </DesktopModal>
    )
  }
}
