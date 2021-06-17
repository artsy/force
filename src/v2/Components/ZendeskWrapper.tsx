import React from "react"
import Zendesk from "react-zendesk"

export const ZendeskWrapper = ({ zdKey }) => {
  if (!zdKey) return null
  return <Zendesk defer zendeskKey={zdKey} />
}
