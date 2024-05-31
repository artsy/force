import { Box, Join, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "found"

import { STEPS, useSellFlowContext } from "Apps/Sell/SellFlowContext"
import React from "react"

export const StepsNavigation: React.FC = () => {
  const { state } = useSellFlowContext()
  const { match } = useRouter()

  return (
    <Join separator={<Spacer />}>
      {STEPS.map((step, index) => (
        <RouterLink
          key={`${step}-${index}`}
          to={`/sell2/submissions/${match.params.id}/${step}`}
        >
          {state.currentStep === step ? " > " : null}
          {step}
        </RouterLink>
      ))}
    </Join>
  )
}
