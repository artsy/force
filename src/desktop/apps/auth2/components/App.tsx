import React from 'react'
import styled from 'styled-components'

import AuthForm from '@artsy/reaction/dist/Components/Authorization/AuthForm'

interface Props {
  mode: string
}

export class App extends React.Component<Props> {
  render() {
    return (
      <AuthFormContainer>
        <AuthForm
          {...this.props}
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
