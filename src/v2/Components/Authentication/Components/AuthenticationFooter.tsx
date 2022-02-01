import { Box, BoxProps, Clickable, Text, Join, Spacer } from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { ModalType } from "../Types"

interface AuthenticationFooterProps extends BoxProps {
  handleTypeChange?: (modalType: ModalType) => void
  mode?: ModalType
  onAppleLogin?: (e: any) => void
  onFacebookLogin?: (e: any) => void
  onGoogleLogin?: (e: any) => void
  showRecaptchaDisclaimer?: boolean
}

export const AuthenticationFooter: React.FC<AuthenticationFooterProps> = ({
  handleTypeChange,
  mode,
  onAppleLogin,
  onFacebookLogin,
  onGoogleLogin,
  showRecaptchaDisclaimer,
  ...rest
}) => {
  return (
    <Container variant="xs" color="black60" textAlign="center" {...rest}>
      {(() => {
        switch (mode) {
          case "login": {
            return (
              <>
                {"Log in using "}
                <Clickable
                  color="black60"
                  textDecoration="underline"
                  onClick={onAppleLogin}
                >
                  Apple
                </Clickable>
                {", "}
                <Clickable
                  color="black60"
                  textDecoration="underline"
                  onClick={onGoogleLogin}
                >
                  Google
                </Clickable>
                {", "}
                {" or "}
                <Clickable
                  color="black60"
                  textDecoration="underline"
                  onClick={onFacebookLogin}
                >
                  Facebook
                </Clickable>
                {". "}
                {"Don’t have an account? "}
                <Clickable
                  color="black60"
                  textDecoration="underline"
                  onClick={() => handleTypeChange?.("signup" as ModalType)}
                  data-test="signup"
                >
                  Sign up.
                </Clickable>
              </>
            )
          }

          case "forgot": {
            return (
              <>
                {"Don’t need to reset? "}
                <Clickable
                  color="black60"
                  textDecoration="underline"
                  onClick={() => handleTypeChange?.("login" as ModalType)}
                  data-test="login"
                >
                  Log in
                </Clickable>
                {" or "}
                <Clickable
                  color="black60"
                  textDecoration="underline"
                  onClick={() => handleTypeChange?.("signup" as ModalType)}
                  data-test="signup"
                >
                  sign up.
                </Clickable>
              </>
            )
          }

          case "signup": {
            return (
              <Join separator={<Spacer mt={1} />}>
                <Box>
                  {"Sign up using "}
                  <Clickable
                    color="black60"
                    textDecoration="underline"
                    onClick={onAppleLogin}
                  >
                    Apple
                  </Clickable>
                  {", "}
                  <Clickable
                    color="black60"
                    textDecoration="underline"
                    onClick={onGoogleLogin}
                  >
                    Google
                  </Clickable>
                  {", "}
                  {" or "}
                  <Clickable
                    color="black60"
                    textDecoration="underline"
                    onClick={onFacebookLogin}
                  >
                    Facebook
                  </Clickable>
                  {". "}
                </Box>

                <Box>
                  {"Already have an account? "}
                  <Clickable
                    color="black60"
                    textDecoration="underline"
                    onClick={() => handleTypeChange?.("login" as ModalType)}
                    data-test="login"
                  >
                    Log in.
                  </Clickable>
                </Box>

                {showRecaptchaDisclaimer && (
                  <Box>
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a
                      color="black60"
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      color="black60"
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Service
                    </a>{" "}
                    apply.
                  </Box>
                )}
              </Join>
            )
          }
        }
      })()}
    </Container>
  )
}

// Legacy CSS will attempt to color the links.
// Can remove this once migrated to new app shell.
const Container = styled(Text)`
  a {
    color: inherit;
  }
`
