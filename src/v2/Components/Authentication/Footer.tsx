import { Box, Flex, Link } from "@artsy/palette"
import React from "react"
import { data as sd } from "sharify"
import { CaptchaTerms, FooterText } from "./commonElements"
import { ModalType } from "./Types"

interface FooterProps {
  handleTypeChange?: (modalType: ModalType) => void
  inline?: boolean
  mode?: ModalType
  onAppleLogin?: (e: any) => void
  onFacebookLogin?: (e: any) => void
  showRecaptchaDisclaimer?: boolean
}

export const Footer = (props: FooterProps) => {
  const {
    handleTypeChange,
    inline,
    mode,
    onAppleLogin,
    onFacebookLogin,
    showRecaptchaDisclaimer,
  } = props

  switch (mode) {
    case "login": {
      const thirdPartyLogin = sd.ENABLE_SIGN_IN_WITH_APPLE ? (
        <FooterText>
          {"Log in using "}
          <Link color="black60" onClick={onAppleLogin}>
            Apple
          </Link>{" "}
          {" or "}
          <Link color="black60" onClick={onFacebookLogin}>
            Facebook
          </Link>{" "}
          {". "}
        </FooterText>
      ) : (
        <FooterText>
          {"Log in using "}
          <Link color="black60" onClick={onFacebookLogin}>
            Facebook
          </Link>
          {". "}
        </FooterText>
      )
      return (
        <Flex flexDirection={inline ? "row" : "column"} justifyContent="center">
          {thirdPartyLogin}
          <FooterText>
            {"Don’t have an account? "}
            <Link
              color="black60"
              onClick={() => handleTypeChange("signup" as ModalType)}
              data-test="signup"
            >
              Sign up.
            </Link>
          </FooterText>
        </Flex>
      )
    }
    case "forgot": {
      return (
        <Box textAlign="center">
          <FooterText>
            {"Don’t need to reset? "}
            <Link
              color="black60"
              onClick={() => handleTypeChange("login" as ModalType)}
              data-test="login"
            >
              Log in
            </Link>
            {" or "}
            <Link
              color="black60"
              onClick={() => handleTypeChange("signup" as ModalType)}
              data-test="signup"
            >
              sign up.
            </Link>
          </FooterText>
        </Box>
      )
    }
    default: {
      const thirdPartySignUp = sd.ENABLE_SIGN_IN_WITH_APPLE ? (
        <FooterText>
          {"Sign up using "}
          <Link color="black60" onClick={onAppleLogin}>
            Apple
          </Link>{" "}
          {" or "}
          <Link color="black60" onClick={onFacebookLogin}>
            Facebook
          </Link>{" "}
          {". "}
        </FooterText>
      ) : (
        <FooterText>
          <Link color="black60" onClick={onFacebookLogin}>
            Sign up using Facebook.
          </Link>{" "}
        </FooterText>
      )
      return (
        <Box>
          <Flex
            flexDirection={inline ? "row" : "column"}
            justifyContent="center"
          >
            {thirdPartySignUp}
          </Flex>
          <Flex
            flexDirection={inline ? "row" : "column"}
            justifyContent="center"
          >
            <FooterText>
              {"Already have an account? "}
              <Link
                color="black60"
                onClick={() => handleTypeChange("login" as ModalType)}
                data-test="login"
              >
                Log in.
              </Link>
            </FooterText>
          </Flex>
          {showRecaptchaDisclaimer && <CaptchaTerms />}
        </Box>
      )
    }
  }
}
