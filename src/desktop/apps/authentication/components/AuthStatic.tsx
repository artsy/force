import * as React from "react";
import { FormSwitcher } from "v2/Components/Authentication/FormSwitcher"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { ModalHeader } from "v2/Components/Modal/ModalHeader"
import { handleSubmit } from "../helpers"
import { Flex, FlexProps } from "@artsy/palette"

interface AuthStaticProps extends FlexProps {
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
    <Flex
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      justifyContent="center"
      mx="auto"
      p={4}
      width={440}
      {...rest}
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
  )
}
