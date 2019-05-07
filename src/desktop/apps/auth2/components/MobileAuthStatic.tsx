import React from "react"
import styled from "styled-components"
import Colors from "reaction/Assets/Colors"
import { FormSwitcher } from "reaction/Components/Authentication/FormSwitcher"
import { handleSubmit } from "../helpers"
import {
  ModalType,
  ModalOptions,
} from "reaction/Components/Authentication/Types"
import { data as sd } from "sharify"

interface Props {
  type: string
  subtitle?: string
  options: ModalOptions
}

export class MobileAuthStatic extends React.Component<Props> {
  onHandleSubmit = (values, formikBag) => {
    const { type, options } = this.props
    // @ts-ignore
    grecaptcha.ready(() => {
      // @ts-ignore
      grecaptcha.execute(sd.RECAPTCHA_KEY, { action: type })
      handleSubmit(type as ModalType, options, values, formikBag)
    })
  }

  render() {
    const { type, options } = this.props
    const submitUrls = {
      login: "/log_in",
      forgot: "/forgot_password",
      signup: "/sign_up",
      facebook: "/users/auth/facebook",
      twitter: "/users/auth/twitter",
    }

    return (
      <AuthFormContainer>
        <MobileContainer>
          <FormSwitcher
            {...this.props}
            title={options.title}
            type={type as ModalType}
            handleSubmit={this.onHandleSubmit}
            onBackButtonClicked={() => {
              if (typeof window !== "undefined") {
                window.location.href = options.redirectTo || "/"
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
