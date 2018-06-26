import React from 'react'
import styled from 'styled-components'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/Desktop/FormSwitcher'
import {
  ModalType,
  ModalOptions,
} from '@artsy/reaction/dist/Components/Authentication/Types'
import { DesktopHeader } from '@artsy/reaction/dist/Components/Authentication/Desktop/Components/DesktopHeader'
import { handleSubmit } from '../helpers'

interface Props {
  type: string
  subtitle?: string
  options: ModalOptions
}

export class AuthStatic extends React.Component<Props> {
  render() {
    return (
      <AuthFormContainer>
        <DesktopHeader subtitle={this.props.subtitle} />
        <FormSwitcher
          {...this.props}
          type={this.props.type as ModalType}
          handleSubmit={handleSubmit.bind(
            this,
            this.props.type,
            this.props.options
          )}
        />
      </AuthFormContainer>
    )
  }
}

const AuthFormContainer = styled.div`
  max-width: 400px;
  margin: auto;
`
