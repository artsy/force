import React from "react"
import styled from "styled-components"
import { FormSwitcher } from "v2/Components/Authentication/FormSwitcher"
import { handleSubmit } from "../helpers"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { Box, Flex, color } from "@artsy/palette"

interface Props {
  type: string
  subtitle?: string
  options: ModalOptions
}

export class MobileAuthStatic extends React.Component<Props> {
  render() {
    const { type, options } = this.props
    const submitUrls = {
      login: "/log_in",
      forgot: "/forgot_password",
      signup: "/sign_up",
      apple: "/users/auth/apple",
      facebook: "/users/auth/facebook",
    }

    return (
      <Box maxWidth={400} mx="auto">
        <MobileContainer>
          <FormSwitcher
            {...this.props}
            title={options.title || options.copy}
            type={type as ModalType}
            handleSubmit={handleSubmit.bind(this, type, options)}
            onBackButtonClicked={() => {
              if (typeof window !== "undefined") {
                window.location.href = options.redirectTo || "/"
              }
            }}
            submitUrls={submitUrls}
            showRecaptchaDisclaimer={true}
            isMobile
            isStatic
          />
        </MobileContainer>
      </Box>
    )
  }
}

const MobileContainer = styled(Flex)`
  border: 1px solid ${color("black10")};
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  align-self: center;
  justify-content: center;

  form {
    width: 100%;
  }
`
