import React from 'react'
import styled from 'styled-components'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/Desktop/FormSwitcher'
import { ModalType } from '@artsy/reaction/dist/Components/Authentication/Types'
import { DesktopHeader } from '@artsy/reaction/dist/Components/Authentication/Desktop/Components/DesktopHeader'
import { handleSubmit } from '../helpers'

interface Props {
  type: string
  subtitle?: string
  options?: object
}

export class AuthStatic extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
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
      </Wrapper>
    )
  }
}

const AuthFormContainer = styled.div`
  max-width: 400px;
  padding: 20px 0;
`

const Wrapper = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
