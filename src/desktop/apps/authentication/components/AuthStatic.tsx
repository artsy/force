import React from "react"
import { FormSwitcher } from "v2/Components/Authentication/FormSwitcher"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { ModalHeader } from "v2/Components/Modal/ModalHeader"
import { handleSubmit } from "../helpers"
import { Box, Flex, FlexProps } from "@artsy/palette"

interface Props extends FlexProps {
  type: ModalType
  meta: {
    title?: string
  }
  options: ModalOptions
}

export const AuthStatic: React.FC<Props> = props => {
  const {
    type,
    meta: { title },
    options,
    ...flexProps
  } = props
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="90vh"
      {...flexProps}
    >
      <Box py={2} maxWidth={400}>
        <ModalHeader title={title} hasLogo />
        <FormSwitcher
          {...props}
          type={type}
          isStatic
          handleSubmit={handleSubmit.bind(this, type, options)}
          submitUrls={{
            apple: "/users/auth/apple",
            facebook: "/users/auth/facebook",
            forgot: "/forgot_password",
            login: "/log_in",
            signup: "/sign_up",
          }}
          showRecaptchaDisclaimer={true}
        />
      </Box>
    </Flex>
  )
}
