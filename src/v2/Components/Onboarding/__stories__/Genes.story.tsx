import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "v2/Artsy"
import Genes from "../Steps/Genes"

storiesOf("Onboarding", module).add("Gene Follow", () => {
  return (
    <SystemContextProvider>
      <Genes onNextButtonPressed={null} />
    </SystemContextProvider>
  )
})
