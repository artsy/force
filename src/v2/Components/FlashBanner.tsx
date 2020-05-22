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

type BannerMessage = string | React.FC

const messages: Record<FlashMessageKey, BannerMessage> = {
  confirmed: "Your email has been confirmed.",
  already_confirmed: "You have already confirmed your email.",
  invalid_token: "Your token is invalid. Please try again.",
  blank_token: "No token found. Please try again.",
  expired_token: "An error has occurred. Please try again.",
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
