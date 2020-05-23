import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "v2/Artsy"
import { Wizard } from "../Wizard"

storiesOf("Onboarding", module).add("Wizard", () => {
  return (
    <div>
      <SystemContextProvider>
        <Wizard />
      </SystemContextProvider>
    </div>
  )
})
