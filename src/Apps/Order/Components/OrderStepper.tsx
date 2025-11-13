import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { Clickable, Step, Stepper } from "@artsy/palette"
import type { OrderStepper_order$data } from "__generated__/OrderStepper_order.graphql"
import { type FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"

function typedArray<T extends string>(...elems: T[]): T[] {
  return elems
}

export const offerFlowSteps = typedArray(
  "Offer",
  "Shipping",
  "Payment",
  "Review"
)
export const buyNowFlowSteps = typedArray("Shipping", "Payment", "Review")
export const privateFlowSteps = typedArray("Payment", "Review")
export const counterofferFlowSteps = typedArray("Respond", "Review")

export interface OrderStepperProps {
  order: OrderStepper_order$data
  currentStep: string
  steps: string[]
}

export interface StepperComponentProps {
  steps: string[]
  currentStep: string
  completedOrderSteps: string[]
  onStepClick: (step: string) => void
}

const StepperComponent: FC<StepperComponentProps> = ({
  steps,
  currentStep,
  completedOrderSteps,
  onStepClick,
}) => {
  const stepIndex = steps.indexOf(currentStep)

  return (
    <Stepper
      initialTabIndex={stepIndex}
      currentStepIndex={stepIndex}
      disableNavigation={false}
      data-testid="orderStepper"
    >
      {steps.map(step => (
        <Step
          name={
            completedOrderSteps.includes(step) ? (
              <Clickable onClick={() => onStepClick(step)}>{step}</Clickable>
            ) : (
              step
            )
          }
          key={step}
          data-testid={currentStep === step ? "currentStep" : undefined}
        />
      ))}
    </Stepper>
  )
}

export const OrderStepper: FC<React.PropsWithChildren<OrderStepperProps>> = ({
  order,
  steps,
  currentStep,
}) => {
  const { router } = useRouter()

  const completedOrderSteps = useMemo(() => {
    const completedSteps: string[] = []

    if (steps === counterofferFlowSteps && currentStep === "Review") {
      completedSteps.push("Respond")
      return completedSteps
    }

    if (order.mode === "OFFER") {
      completedSteps.push("Offer")
    }

    const hasShipping =
      order.requestedFulfillment ||
      extractNodes(
        extractNodes(order.lineItems)?.[0].shippingQuoteOptions
      ).find(shippingQuote => shippingQuote.isSelected)

    if (hasShipping) {
      completedSteps.push("Shipping")
    }

    if (order.paymentSet) {
      completedSteps.push("Payment")
    }

    if (
      completedSteps.includes("Shipping") &&
      completedSteps.includes("Payment")
    ) {
      completedSteps.push("Review")
    }

    return completedSteps
  }, [order, steps, currentStep])

  const handleStepClick = (step: string) => {
    if (typeof window === "undefined") return

    // handle counteroffer flow
    if (completedOrderSteps.includes("Respond")) {
      router.push(`/orders/${order.internalID}/respond`)
      return
    }

    router.push(
      window.location.pathname.replace(
        currentStep.toLowerCase(),
        step.toLowerCase()
      )
    )
  }

  return (
    <StepperComponent
      steps={steps}
      currentStep={currentStep}
      completedOrderSteps={completedOrderSteps}
      onStepClick={handleStepClick}
    />
  )
}

export const OrderStepperFragmentContainer = createFragmentContainer(
  OrderStepper,
  {
    order: graphql`
      fragment OrderStepper_order on CommerceOrder {
        internalID
        mode
        paymentSet
        requestedFulfillment {
          __typename
        }
        paymentMethodDetails {
          __typename
          ... on CreditCard {
            id
          }
          ... on BankAccount {
            id
          }
          ... on WireTransfer {
            isManualPayment
          }
        }
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
              shippingQuoteOptions {
                edges {
                  node {
                    isSelected
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)
