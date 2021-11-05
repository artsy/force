import * as React from "react"
import { FormSwitcher } from "v2/Components/Authentication/FormSwitcher"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { ModalHeader } from "v2/Components/Modal/ModalHeader"
import { handleSubmit } from "v2/Apps/Authentication/Utils/helpers"
import { Flex, BoxProps } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface AuthStaticProps extends BoxProps {
  type: ModalType
  meta: { title?: string }
  options: ModalOptions
}

export const AuthStatic: React.FC<AuthStaticProps> = ({
  type,
  meta: { title },
  options,
  ...rest
}) => {
  return (
    <HorizontalPadding {...rest}>
      <Flex
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
        justifyContent="center"
        mx="auto"
        py={4}
        maxWidth={440}
      >
        <ModalHeader title={title} hasLogo />

        <FormSwitcher
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
          showRecaptchaDisclaimer
          options={options}
        />
      </Flex>
    </HorizontalPadding>
  )
}
