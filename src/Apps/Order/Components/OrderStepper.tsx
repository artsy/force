import { useState, useEffect, FC } from "react"
import { Media } from "Utils/Responsive"
import { Box, Clickable, Step, Stepper } from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"
import { createFragmentContainer, graphql } from "react-relay"
import { OrderStepper_order$data } from "__generated__/OrderStepper_order.graphql"
import { extractNodes } from "Utils/extractNodes"
import { isPaymentSet } from "Apps/Order/Utils/orderUtils"

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

export const OrderStepper: FC<OrderStepperProps> = ({
  order,
  steps,
  currentStep,
}) => {
  const { router } = useRouter()
  const [stepIndex, setStepIndex] = useState(steps.indexOf(currentStep))
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    const completedSteps: string[] = []

    if (order.mode === "OFFER") {
      completedSteps.push("Offer")
    }

    if (
      order.requestedFulfillment ||
      extractNodes(
        extractNodes(order.lineItems)?.[0].shippingQuoteOptions
      ).find(shippingQuote => shippingQuote.isSelected)
    ) {
      completedSteps.push("Shipping")
    }

    if (isPaymentSet(order.paymentMethodDetails)) {
      completedSteps.push("Payment")
    }

    if (
      completedSteps.includes("Shipping") &&
      completedSteps.includes("Payment")
    ) {
      completedSteps.push("Review")
    }

    setCompletedSteps(completedSteps)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  const handleStepClick = (step: string) => {
    const clickedStepIndex = steps.indexOf(step)
    setStepIndex(clickedStepIndex)

    const activeStep = currentStep.toLocaleLowerCase()
    const nextStep = step.toLocaleLowerCase()
    router.push(window.location.pathname.replace(activeStep, nextStep))
  }

  return (
    <>
      <Media between={["xs", "md"]}>
        <Box>
          <Stepper
            initialTabIndex={stepIndex}
            currentStepIndex={stepIndex}
            disableNavigation={false}
          >
            {steps.map(step => (
              <Step
                name={
                  completedSteps.includes(step) ? (
                    <Clickable onClick={() => handleStepClick(step)}>
                      {step}
                    </Clickable>
                  ) : (
                    step
                  )
                }
                key={step}
              />
            ))}
          </Stepper>
        </Box>
      </Media>
      <Media greaterThan="sm">
        <Stepper
          initialTabIndex={stepIndex}
          currentStepIndex={stepIndex}
          disableNavigation={false}
        >
          {steps.map(step => (
            <Step
              name={
                completedSteps.includes(step) ? (
                  <Clickable onClick={() => handleStepClick(step)}>
                    {step}
                  </Clickable>
                ) : (
                  step
                )
              }
              key={step}
            />
          ))}
        </Stepper>
      </Media>
    </>
  )
}

export const OrderStepperFragmentContainer = createFragmentContainer(
  OrderStepper,
  {
    order: graphql`
      fragment OrderStepper_order on CommerceOrder {
        mode
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
