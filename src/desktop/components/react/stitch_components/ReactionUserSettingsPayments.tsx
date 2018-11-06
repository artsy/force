import React from "react"
import { ContextProvider } from "reaction/Artsy"
import { UserSettingsPaymentsQueryRenderer as Renderer } from "reaction/Components/Payment/UserSettingsPayments"
import { data as sd } from "sharify"

export const ReactionUserSettingsPayments = () => {
  return (
    <ContextProvider user={sd.CURRENT_USER}>
      <Renderer />
    </ContextProvider>
  )
}
