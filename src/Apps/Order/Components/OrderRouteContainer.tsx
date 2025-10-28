import { Skeleton, Spacer } from "@artsy/palette"
import { OrderStepperFragmentContainer } from "./OrderStepper"
import { TwoColumnLayout } from "./TwoColumnLayout"
import { useEffect, useState } from "react"

export const OrderRouteContainer = ({
  order,
  currentStep,
  steps,
  content,
  sidebar,
}) => {
  const [isStepperReady, setIsStepperReady] = useState(false)

  useEffect(() => {
    // Let the stepper render and calculate its layout before showing it
    const timer = setTimeout(() => setIsStepperReady(true), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isStepperReady ? (
        <OrderStepperFragmentContainer
          order={order}
          currentStep={currentStep}
          steps={steps}
        />
      ) : (
        <Skeleton width="100%" height={40} />
      )}
      <Spacer y={4} />
      <TwoColumnLayout Content={content} Sidebar={sidebar} />
    </>
  )
}
