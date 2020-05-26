import React from "react"
import qs from "qs"
import { FlashMessage } from "./FlashMessage"

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
      console.log({ query })
      if (query["flash_message"]) setMessageCode(query["flash_message"])
    }
  }, [])

  if (!messageCode) return null
  return <FlashMessage messageCode={messageCode} />
}
