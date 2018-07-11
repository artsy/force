import React from 'react'
import styled from 'styled-components'
import Colors from '@artsy/reaction/dist/Assets/Colors'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/FormSwitcher'
import { handleSubmit } from '../helpers'
import {
  ModalType,
  ModalOptions,
} from '@artsy/reaction/dist/Components/Authentication/Types'
import { data as sd } from 'sharify'

interface Props {
  type: string
  subtitle?: string
  options: ModalOptions
}

export class MobileAuthStatic extends React.Component<Props> {
  render() {
    const submitUrls = {
      login: sd.AP.loginPagePath,
      forgot: '/forgot_password',
      signup: sd.AP.signupPagePath,
      facebook: sd.AP.facebookPath,
      twitter: sd.AP.twitterPath,
    }

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
            onFacebookLogin={() =>
              (window.location.href = submitUrls.facebook + `?${authQueryData}`)
            }
            onTwitterLogin={() =>
              (window.location.href = submitUrls.twitter + `?${authQueryData}`)
            }
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
