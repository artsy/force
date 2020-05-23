import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "v2/Artsy"
import CollectorIntent from "../Steps/CollectorIntent"

storiesOf("Onboarding", module).add("Collector Intent", () => {
  return (
    <SystemContextProvider>
      <CollectorIntent onNextButtonPressed={() => null} />
    </SystemContextProvider>
  )
})
