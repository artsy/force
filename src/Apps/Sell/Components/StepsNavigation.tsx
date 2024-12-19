import { Join, Spacer } from "@artsy/palette"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { RouterLink } from "System/Components/RouterLink"
import type React from "react"

export const StepsNavigation: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { state } = useSellFlowContext()

  const pathForStep = (step: string) => {
    return `/sell/submissions/${state.submission?.externalId}/${step}`
  }

  return (
    <Join separator={<Spacer />}>
      {state.steps.map((step, index) => (
        <RouterLink key={`${step}-${index}`} to={pathForStep(step)}>
          {state.step === step ? " > " : null}
          {step}
        </RouterLink>
      ))}
    </Join>
  )
}
