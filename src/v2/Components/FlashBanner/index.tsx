import React from "react"
import qs from "qs"
import { FlashMessage } from "./FlashMessage"

/**
 * The component responsible for selecting a flash message key from the `flash_message` url query param
 */
export const FlashBanner: React.FunctionComponent = () => {
  const [messageCode, setMessageCode] = React.useState(null)

  React.useEffect(() => {
    const query = qs.parse(window.location.search.slice(1))
    if (query["flash_message"]) setMessageCode(query["flash_message"])
  }, [])

  if (!messageCode) return null
  return <FlashMessage messageCode={messageCode} />
}
