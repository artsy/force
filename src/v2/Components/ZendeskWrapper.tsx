import * as React from "react"
import Zendesk from "react-zendesk"

export const ZendeskWrapper: React.FC<{ zdKey: string }> = ({ zdKey }) => {
  if (!zdKey) {
    return null
  }

  const zendeskAlreadyEmbedded = typeof window !== "undefined" && window.zEmbed
  if (zendeskAlreadyEmbedded) {
    return null
  }

  return <Zendesk defer zendeskKey={zdKey} />
}

ZendeskWrapper.displayName = "ZendeskWrapper"
