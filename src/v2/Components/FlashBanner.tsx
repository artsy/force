import React from "react"
import { Banner, Sans } from "@artsy/palette"

interface Props {
  messageCode: FlashMessageKey
}

export type FlashMessageKey =
  /* email confirmed */
  | "confirmed"
  /* email already confirmed */
  | "already_confirmed"
  /* email confirmation token was invalid */
  | "invalid_token"
  /* email confirmation token was empty */
  | "blank_token"
  /* email confirmation token was expired */
  | "expired_token"

const messages: Record<FlashMessageKey, string | React.FC> = {
  confirmed: "Your email has been confirmed.",
  already_confirmed: "You have already confirmed your email.",
  invalid_token: "An error has occurred. Please contact support@artsy.net.",
  blank_token: "An error has occurred. Please contact support@artsy.net.",
  expired_token: "Link expired. Resend verification email.",
}

export const FlashBanner: React.FunctionComponent<Props> = ({
  messageCode,
}) => {
  const Message = messages[messageCode]
  if (!Message) return null
  return (
    Message && (
      <Banner dismissable backgroundColor="black100">
        <Sans color="white100" size="3" lineHeight={1} weight="medium">
          {typeof Message === "string" ? Message : <Message />}
        </Sans>
      </Banner>
    )
  )
}
