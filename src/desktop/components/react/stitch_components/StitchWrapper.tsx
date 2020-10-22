import React from "react"
import { data as sd } from "sharify"
import { SystemContextProvider } from "v2/Artsy"
import { MediaContextProvider } from "v2/Utils/Responsive"
import { Theme } from "@artsy/palette"
import { FocusVisible } from "v2/Components/FocusVisible"
import { mediator } from "lib/mediator"

export const StitchWrapper = props => {
  return (
    <Theme>
      <SystemContextProvider user={sd.CURRENT_USER} mediator={mediator}>
        <MediaContextProvider>
          <FocusVisible />
          {props.children}
        </MediaContextProvider>
      </SystemContextProvider>
    </Theme>
  )
}
