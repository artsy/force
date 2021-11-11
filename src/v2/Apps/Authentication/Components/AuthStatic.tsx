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
  isMigration?: boolean
}

export const AuthStatic: React.FC<AuthStaticProps> = ({
  type,
  meta: { title },
  options,

  // TODO: fix
  isMigration,
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
            forgot: isMigration ? "/forgot_password2" : "/forgot_password",
            login: isMigration ? "/log_in2" : "/log_in",
            signup: isMigration ? "/sign_up2" : "/sign_up",
          }}
          showRecaptchaDisclaimer
          options={options}
        />
      </Flex>
    </HorizontalPadding>
  )
}
