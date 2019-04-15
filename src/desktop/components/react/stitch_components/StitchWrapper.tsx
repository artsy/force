import React from "react"
import { data as sd } from "sharify"
import { SystemContextProvider } from "reaction/Artsy"
import { MediaContextProvider } from "reaction/Utils/Responsive"
import { Theme } from "@artsy/palette"

const mediator = require("desktop/lib/mediator.coffee")

export const StitchWrapper = props => {
  return (
    <Theme>
      <SystemContextProvider user={sd.CURRENT_USER} mediator={mediator}>
        <MediaContextProvider>{props.children}</MediaContextProvider>
      </SystemContextProvider>
    </Theme>
  )
}
