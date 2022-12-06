import { Spacer } from "@artsy/palette"
import { OrderStepper } from "./OrderStepper"
import { TwoColumnLayout } from "./TwoColumnLayout"

export const OrderRouteContainer = ({
  currentStep,
  steps,
  content,
  sidebar,
}) => (
  <>
    <OrderStepper currentStep={currentStep} steps={steps} />
    <Spacer y={4} />
    <TwoColumnLayout Content={content} Sidebar={sidebar} />
  </>
)
