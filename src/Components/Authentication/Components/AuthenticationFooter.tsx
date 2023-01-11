import {
  Box,
  BoxProps,
  Clickable,
  Button,
  Join,
  Text,
  Spacer,
  FacebookIcon,
  AppleIcon,
  GoogleIcon,
} from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { isTouch } from "Utils/device"
import { ModalType } from "Components/Authentication/Types"

interface AuthenticationFooterProps extends BoxProps {
  handleTypeChange?: (modalType: ModalType) => void
  mode?: ModalType
  onAppleLogin?: (e: any) => void
  onFacebookLogin?: (e: any) => void
  onGoogleLogin?: (e: any) => void
  showRecaptchaDisclaimer?: boolean
  isAutomaticallySubscribed?: boolean
}

export const AuthenticationFooter: React.FC<AuthenticationFooterProps> = ({
  handleTypeChange,
  mode,
  onAppleLogin,
  onFacebookLogin,
  onGoogleLogin,
  showRecaptchaDisclaimer,
  isAutomaticallySubscribed,
  ...rest
}) => {
  return (
    <Container variant="xs" color="black60" textAlign="center" {...rest}>
      {(() => {
        switch (mode) {
          case "login": {
            return (
              <>
                <Join separator={<Spacer y={2} />}>
                  <Button
                    color="black100"
                    onClick={onAppleLogin}
                    variant="secondaryBlack"
                    Icon={AppleIcon}
                    width="100%"
                  >
                    Continue with Apple
                  </Button>
                  <Button
                    color="black100"
                    onClick={onGoogleLogin}
                    variant="secondaryBlack"
                    Icon={GoogleIcon}
                    width="100%"
                  >
                    Continue with Google
                  </Button>
                  <Button
                    color="black100"
                    onClick={onFacebookLogin}
                    variant="secondaryBlack"
                    Icon={FacebookIcon}
                    width="100%"
                  >
                    Continue with Facebook
                  </Button>
                </Join>
                <Spacer y={2} />
                <Box>
                  {"Don't have an account? "}
                  <Clickable
                    color="black60"
                    textDecoration="underline"
                    onClick={() => handleTypeChange?.("signup" as ModalType)}
                    data-test="signup"
                  >
                    Sign up.
                  </Clickable>
                </Box>
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
              <Join separator={<Spacer y={1} />}>
                <Box>
                  <Join separator={<Spacer y={2} />}>
                    <Button
                      color="black100"
                      onClick={onAppleLogin}
                      variant="secondaryBlack"
                      Icon={AppleIcon}
                      width="100%"
                    >
                      Continue with Apple
                    </Button>
                    <Button
                      color="black100"
                      onClick={onGoogleLogin}
                      variant="secondaryBlack"
                      Icon={GoogleIcon}
                      width="100%"
                    >
                      Continue with Google
                    </Button>
                    <Button
                      color="black100"
                      onClick={onFacebookLogin}
                      variant="secondaryBlack"
                      Icon={FacebookIcon}
                      width="100%"
                    >
                      Continue with Facebook
                    </Button>
                  </Join>
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

                <Text variant="xs" color="black60" textAlign="center">
                  By {isTouch ? "tapping" : "clicking"} Sign up or Continue with
                  Apple, Google, or Facebook, you agree to Artsy’s{" "}
                  <a href="/terms" target="_blank">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" target="_blank">
                    Privacy Policy
                  </a>
                  {isAutomaticallySubscribed && (
                    <> and to receiving emails from Artsy</>
                  )}
                  .
                </Text>

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
