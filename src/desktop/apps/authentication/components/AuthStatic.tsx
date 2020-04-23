import React from "react"
import { FormSwitcher } from "@artsy/reaction/dist/Components/Authentication/FormSwitcher"
import {
  ModalType,
  ModalOptions,
} from "reaction/Components/Authentication/Types"
import { ModalHeader } from "reaction/Components/Modal/ModalHeader"
import { handleSubmit } from "../helpers"
import { Box, Flex } from "@artsy/palette"

interface Props {
  type: string
  meta: {
    title?: string
  }
  options: ModalOptions
}

export class AuthStatic extends React.Component<Props> {
  render() {
    const {
      type,
      meta: { title },
      options,
    } = this.props
    return (
      <Flex alignItems="center" justifyContent="center" height="90vh">
        <Box py={2} maxWidth={400}>
          <ModalHeader title={title} hasLogo />
          <FormSwitcher
            {...this.props}
            type={type as ModalType}
            isStatic
            handleSubmit={handleSubmit.bind(this, type, options)}
            submitUrls={{
              login: "/log_in",
              forgot: "/forgot_password",
              signup: "/sign_up",
              apple: "/users/auth/apple",
              facebook: "/users/auth/facebook",
            }}
            showRecaptchaDisclaimer={true}
          />
        </Box>
      </Flex>
    )
  }
}
