import * as React from "react"
import { FormSwitcher } from "Components/Authentication/FormSwitcher"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
import { ModalHeader } from "Components/Modal/ModalHeader"
import { handleSubmit } from "Apps/Authentication/Legacy/Utils/helpers"
import { Flex, BoxProps, Text, Spacer } from "@artsy/palette"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

interface AuthStaticProps extends BoxProps {
  type: ModalType
  meta: { description?: string; title?: string }
  options: ModalOptions
}

export const AuthStatic: React.FC<AuthStaticProps> = ({
  type,
  meta: { description, title },
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
        {description && (
          <Text textAlign="center" variant="sm-display">
            {description}
          </Text>
        )}
        <Spacer y={0.5} />
        <FormSwitcher
          type={type}
          isStatic
          handleSubmit={handleSubmit.bind(this, type, options)}
          submitUrls={{
            apple: "/users/auth/apple",
            facebook: "/users/auth/facebook",
            google: "/users/auth/google",
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
