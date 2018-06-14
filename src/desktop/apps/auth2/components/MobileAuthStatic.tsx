import React from 'react'
import styled from 'styled-components'
import Colors from '@artsy/reaction/dist/Assets/Colors'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/Mobile/FormSwitcher'
import { ModalType } from '@artsy/reaction/dist/Components/Authentication/Types'
// import { MobileSignUpForm } from '@artsy/reaction/dist/Components/Authentication/Mobile/SignUpForm'

interface Props {
  type: string
  subtitle?: string
}

export class MobileAuthStatic extends React.Component<Props> {
  render() {
    return (
      <AuthFormContainer>
        {/* <MobileContainer>
          <MobileSignUpForm
            values={{}}
            handleSubmit={() => null}
            handleTypeChange={() => mode => null}
          />
        </MobileContainer> */}
        <MobileContainer>
          <FormSwitcher
            {...this.props}
            type={this.props.type as ModalType}
            handleSubmit={() => {
              console.log('here.')
            }}
          />
        </MobileContainer>
      </AuthFormContainer>
    )
  }
}

const AuthFormContainer = styled.div`
  max-width: 400px;
  margin: auto;
`

const MobileContainer = styled.div`
  border: 1px solid ${Colors.grayRegular};
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  align-self: center;
  justify-content: center;

  form {
    width: 100%;
  }
`
