import { Checkbox, Serif } from "@artsy/palette"
import React from "react"

export const EmailSubscriptionCheckbox = props => {
  return (
    <Checkbox {...props}>
      <Serif size="3" color="black60">
        {
          "Subscribe to receive email updates about Artsy's products, services, and events."
        }
      </Serif>
    </Checkbox>
  )
}
