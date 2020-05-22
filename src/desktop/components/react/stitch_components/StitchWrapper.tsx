import React from "react"
import { data as sd } from "sharify"
import { SystemContextProvider } from "v2/Artsy"
import { MediaContextProvider } from "v2/Utils/Responsive"
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
