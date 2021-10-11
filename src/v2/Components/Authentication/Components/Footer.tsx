import { Box, Flex, Clickable, Sans } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { CaptchaTerms, FooterText } from "./commonElements"
import { ModalType } from "../Types"
import { themeGet } from "@styled-system/theme-get"

interface FooterProps {
  handleTypeChange?: (modalType: ModalType) => void
  inline?: boolean
  mode?: ModalType
  onAppleLogin?: (e: any) => void
  onFacebookLogin?: (e: any) => void
  showRecaptchaDisclaimer?: boolean
}

const ClickableText = styled(Sans)`
  &:hover {
    color: ${themeGet("colors.black100")};
  }
`

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
      return (
        <Flex flexDirection={inline ? "row" : "column"} justifyContent="center">
          <FooterText>
            {"Log in using "}
            <Clickable
              color="black60"
              textDecoration="underline"
              onClick={onAppleLogin}
            >
              <ClickableText size="2">Apple</ClickableText>
            </Clickable>{" "}
            {" or "}
            <Clickable
              color="black60"
              textDecoration="underline"
              onClick={onFacebookLogin}
            >
              <ClickableText size="2">Facebook</ClickableText>
            </Clickable>
            {". "}
            {"Don’t have an account? "}
            <Clickable
              color="black60"
              textDecoration="underline"
              // @ts-expect-error STRICT_NULL_CHECK
              onClick={() => handleTypeChange("signup" as ModalType)}
              data-test="signup"
            >
              <ClickableText size="2">Sign up.</ClickableText>
            </Clickable>
          </FooterText>
        </Flex>
      )
    }
    case "forgot": {
      return (
        <Box textAlign="center">
          <FooterText>
            {"Don’t need to reset? "}
            <Clickable
              color="black60"
              textDecoration="underline"
              // @ts-expect-error STRICT_NULL_CHECK
              onClick={() => handleTypeChange("login" as ModalType)}
              data-test="login"
            >
              <ClickableText size="2">Log in</ClickableText>
            </Clickable>
            {" or "}
            <Clickable
              color="black60"
              textDecoration="underline"
              // @ts-expect-error STRICT_NULL_CHECK
              onClick={() => handleTypeChange("signup" as ModalType)}
              data-test="signup"
            >
              <ClickableText size="2">sign up.</ClickableText>
            </Clickable>
          </FooterText>
        </Box>
      )
    }
    default: {
      return (
        <Box>
          <Flex
            flexDirection={inline ? "row" : "column"}
            justifyContent="center"
          >
            <FooterText>
              {"Sign up using "}
              <Clickable
                color="black60"
                textDecoration="underline"
                onClick={onAppleLogin}
              >
                <ClickableText size="2">Apple</ClickableText>
              </Clickable>{" "}
              {" or "}
              <Clickable
                color="black60"
                textDecoration="underline"
                onClick={onFacebookLogin}
              >
                <ClickableText size="2">Facebook</ClickableText>
              </Clickable>
              {". "}
            </FooterText>
          </Flex>
          <Flex
            flexDirection={inline ? "row" : "column"}
            justifyContent="center"
          >
            <FooterText>
              {"Already have an account? "}
              <Clickable
                color="black60"
                textDecoration="underline"
                // @ts-expect-error STRICT_NULL_CHECK
                onClick={() => handleTypeChange("login" as ModalType)}
                data-test="login"
              >
                <ClickableText size="2">Log in.</ClickableText>
              </Clickable>
            </FooterText>
          </Flex>
          {showRecaptchaDisclaimer && <CaptchaTerms />}
        </Box>
      )
    }
  }
}
