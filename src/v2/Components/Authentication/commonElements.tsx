import { growAndFadeIn } from "v2/Assets/Animations"
import React from "react"
import styled from "styled-components"
export { Footer } from "./Footer"
export { TermsOfServiceCheckbox } from "./TermsOfServiceCheckbox"
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Link,
  Sans,
  Serif,
} from "@artsy/palette"

export const FormContainer = styled.form<{ height?: number }>`
  display: flex;
  flex-direction: column;
  min-height: ${p => (p.height ? p.height + "px" : "auto")};
`

export const MobileInnerWrapper = styled.div`
  position: relative;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  height: 285px;
  min-height: fit-content;
`

export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: stretch;
  width: 100%;
  min-width: 260px;
`

export const BackButton = styled.div`
  display: flex;
  justify-self: start;
  align-self: center;
  position: absolute;
  top: 35px;
  left: 0;
  cursor: pointer;
`

export const ErrorContainer = styled(Box)<{ show: boolean }>`
  margin-top: ${p => (p.show ? "auto" : "0")};
  visibility: ${p => (p.show ? "visible" : "hidden")};
  transition: visibility 0.2s linear;
  animation: ${p => p.show && growAndFadeIn("16px")} 0.25s linear;
  height: ${p => (p.show ? "auto" : "0")};
`

export const Error = (props: { children: any; show: boolean }) => (
  <ErrorContainer show={props.show} mb={1}>
    <Sans size="2" color="red100">
      {props.children}
    </Sans>
  </ErrorContainer>
)

export const MobileHeader = (props: {
  children: React.ReactElement | string
}) => (
  <Flex p={1} mt={2} justifyContent="center">
    <Serif size="5t" weight="semibold" textAlign="center">
      {props.children}
    </Serif>
  </Flex>
)

export const FooterText = (props: { children: any; mt?: number }) => (
  <Sans size="2" color="black60" mt={props.mt || 1} mr={0.5} textAlign="center">
    {props.children}
  </Sans>
)

export const ForgotPassword = (props: { onClick: () => void }) => (
  <Sans size="2">
    <Link color="black60" {...props} data-test="forgot" rel="nofollow">
      Forgot Password?
    </Link>
  </Sans>
)

export const SubmitButton = (props: ButtonProps) => (
  <Button width="100%" size="large" mt={30.0} mb={0.5} {...props}>
    {props.children}
  </Button>
)

export const CaptchaTerms = () => {
  return (
    <FooterText mt={2}>
      This site is protected by reCAPTCHA and the Google{" "}
      <Link color="black60" href="https://policies.google.com/privacy">
        Privacy Policy
      </Link>{" "}
      <Link color="black60" href="https://policies.google.com/terms">
        Terms of Service
      </Link>{" "}
      apply.
    </FooterText>
  )
}
