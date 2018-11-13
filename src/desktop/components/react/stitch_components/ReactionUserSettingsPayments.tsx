import React from "react"
import { ContextProvider } from "reaction/Artsy"
import { UserSettingsPaymentsQueryRenderer as UserSettingsPayments } from "reaction/Components/Payment/UserSettingsPayments"
import { data as sd } from "sharify"

export const ReactionUserSettingsPayments = () => {
  return (
    <ContextProvider user={sd.CURRENT_USER}>
      <UserSettingsPayments />
    </ContextProvider>
  )
}
