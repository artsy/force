import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "v2/Artsy"
import Budget from "../Steps/Budget"

storiesOf("Onboarding", module).add("Budget", () => {
  return (
    <div>
      <SystemContextProvider>
        {/* tbc */}
        <Budget onNextButtonPressed={null} />
      </SystemContextProvider>
    </div>
  )
})
