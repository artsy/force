import React from 'react'
import styled from 'styled-components'
import { AuthForm } from '@artsy/reaction/dist/Components/Authorization/AuthForm'
import { DesktopHeader } from '@artsy/reaction/dist/Components/Authorization/DesktopHeader'

interface Props {
  type: string
  subtitle?: string
}

export class AuthStatic extends React.Component<Props> {
  render() {
    return (
      <AuthFormContainer>
        <DesktopHeader subtitle={this.props.subtitle} />
        <AuthForm
          {...this.props}
          type={this.props.type}
          handleSubmit={() => {
            console.log('here.')
          }}
        />
      </AuthFormContainer>
    )
  }
}

const AuthFormContainer = styled.div`
  max-width: 400px;
  margin: auto;
`
