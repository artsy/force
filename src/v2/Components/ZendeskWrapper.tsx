import React from "react"
import Zendesk from "react-zendesk"
import { data as sd } from "sharify"

export const ZendeskWrapper = () => {
  if (!sd.ZENDESK_KEY) return null
  return <Zendesk defer zendeskKey={sd.ZENDESK_KEY} />
}
