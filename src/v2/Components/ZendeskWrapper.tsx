import React from "react"
import Zendesk from "react-zendesk"
import { data as sd } from "sharify"

export const ZendeskWrapper = () => {
  return <Zendesk zendeskKey={sd.ZENDESK_KEY} />
}
