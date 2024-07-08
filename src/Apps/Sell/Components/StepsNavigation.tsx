import { Join, Spacer } from "@artsy/palette"
import { STEPS, useSellFlowContext } from "Apps/Sell/SellFlowContext"
import React from "react"
import { RouterLink } from "System/Components/RouterLink"

export const StepsNavigation: React.FC = () => {
  const { state } = useSellFlowContext()

  const pathForStep = (step: string) => {
    return `/sell/submissions/${state.submissionID}/${step}`
  }

  const steps = STEPS.filter(step => step !== "thank-you")

  return (
    <Join separator={<Spacer />}>
      {steps.map((step, index) => (
        <RouterLink key={`${step}-${index}`} to={pathForStep(step)}>
          {state.step === step ? " > " : null}
          {step}
        </RouterLink>
      ))}
    </Join>
  )
}
