import { Spacer } from "@artsy/palette"
import { OrderStepperFragmentContainer } from "./OrderStepper"
import { TwoColumnLayout } from "./TwoColumnLayout"

export const OrderRouteContainer = ({
  order,
  currentStep,
  steps,
  content,
  sidebar,
}) => (
  <>
    <OrderStepperFragmentContainer
      order={order}
      currentStep={currentStep}
      steps={steps}
    />
    <Spacer y={4} />
    <TwoColumnLayout Content={content} Sidebar={sidebar} />
  </>
)
