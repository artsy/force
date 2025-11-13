import { useDidMount } from "Utils/Hooks/useDidMount"
import { Skeleton, Spacer } from "@artsy/palette"
import { OrderStepperFragmentContainer } from "./OrderStepper"
import { TwoColumnLayout } from "./TwoColumnLayout"

export const OrderRouteContainer = ({
  order,
  currentStep,
  steps,
  content,
  sidebar,
}) => {
  const isMounted = useDidMount()

  return (
    <>
      {isMounted ? (
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
