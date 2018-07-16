import React from 'react'
import styled from 'styled-components'
import Colors from '@artsy/reaction/dist/Assets/Colors'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/FormSwitcher'
import { handleSubmit } from '../helpers'
import {
  ModalType,
  ModalOptions,
} from '@artsy/reaction/dist/Components/Authentication/Types'

interface Props {
  type: string
  subtitle?: string
  options: ModalOptions
}

export class MobileAuthStatic extends React.Component<Props> {
  render() {
    const submitUrls = {
      login: '/log_in',
      forgot: '/forgot_password',
      signup: '/sign_up',
      facebook: '/users/auth/facebook',
      twitter: '/users/auth/twitter',
    }

    // TODO: pull analytics data
    const authQueryData = {}

    return (
      <AuthFormContainer>
        <MobileContainer>
          <FormSwitcher
            {...this.props}
            type={this.props.type as ModalType}
            handleSubmit={handleSubmit.bind(
              this,
              this.props.type,
              this.props.options
            )}
            onFacebookLogin={() => {
              if (typeof window !== 'undefined') {
                window.location.href = submitUrls.facebook + `?${authQueryData}`
              }
            }}
            onTwitterLogin={() => {
              if (typeof window !== 'undefined') {
                window.location.href = submitUrls.twitter + `?${authQueryData}`
              }
            }}
            submitUrls={submitUrls}
            isMobile
            isStatic
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
