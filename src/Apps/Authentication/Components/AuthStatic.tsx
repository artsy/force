import * as React from "react"
import { FormSwitcher } from "Components/Authentication/FormSwitcher"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
import { ModalHeader } from "Components/Modal/ModalHeader"
import { handleSubmit } from "Apps/Authentication/Utils/helpers"
import { Flex, BoxProps, Text, Spacer } from "@artsy/palette"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

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
        <Text textAlign="center" variant="sm-display">
          Build your personalized profile. Get art market insights. Buy and sell
          with confidence.
        </Text>
        <Spacer my={0.5} />
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
