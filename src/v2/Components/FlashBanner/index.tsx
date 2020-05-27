import React from "react"
import qs from "qs"
import { Banner, Sans } from "@artsy/palette"

/** Flash messages triggered by a url `flash_message` query param
 * A message can be a string or a React Component that takes no props
 * (that is, use relay or context if necessary)
 */
const messageByQueryParam: { [k: string]: string | React.FC } = {
  confirmed: "Your email has been confirmed.",
  already_confirmed: "You have already confirmed your email.",
  invalid_token: "An error has occurred. Please contact support@artsy.net.",
  blank_token: "An error has occurred. Please contact support@artsy.net.",
  expired_token: "Link expired. Resend verification email.",
}

/**
 * The component responsible for selecting a flash message key from the `flash_message` url query param
 */
export const FlashBanner: React.FunctionComponent<{
  messageCode?: string
}> = props => {
  const [messageCode, setMessageCode] = React.useState(props.messageCode)

  React.useEffect(() => {
    if (!messageCode) {
      const query = qs.parse(window.location.search.slice(1))
      if (query["flash_message"]) setMessageCode(query["flash_message"])
    }
  }, [])

  if (!messageCode) return null
  const Message = messageByQueryParam[messageCode]
  if (!Message) return null

  return (
    <Banner dismissable backgroundColor="black100">
      <Sans color="white100" size="3" lineHeight={1} weight="medium">
        {typeof Message === "string" ? Message : <Message />}
      </Sans>
    </Banner>
  )
}
