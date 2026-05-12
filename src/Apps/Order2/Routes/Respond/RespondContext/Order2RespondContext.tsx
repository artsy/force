import type {
  RespondAction,
  RespondStep,
} from "Apps/Order2/Routes/Respond/RespondContext/types"
import {
  RespondStepName,
  RespondStepState,
} from "Apps/Order2/Routes/Respond/RespondContext/types"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import type { Order2RespondContext_order$key } from "__generated__/Order2RespondContext_order.graphql"
import type React from "react"
import { createContext, useContext, useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2RespondContextValue {
  checkoutTracking: ReturnType<typeof useCheckoutTracking>
  artworkPath: string
  steps: RespondStep[]
  selectedAction: RespondAction | null
  setRespondAction: (action: RespondAction) => void
  setRespondComplete: () => void
  editRespond: () => void
}

const Order2RespondContext = createContext<Order2RespondContextValue | null>(
  null,
)

interface Order2RespondContextProviderProps {
  order: Order2RespondContext_order$key
  children: React.ReactNode
}

export const Order2RespondContextProvider: React.FC<
  Order2RespondContextProviderProps
> = ({ order, children }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const checkoutTracking = useCheckoutTracking(orderData)

  // Calculate artworkPath from orderData
  const artworkPath = useMemo(() => {
    const artworkSlug = orderData.lineItems?.[0]?.artwork?.slug
    return artworkSlug ? `/artwork/${artworkSlug}` : "/"
  }, [orderData])

  // Initialize steps - always start with RESPOND step active
  const [steps, setSteps] = useState<RespondStep[]>([
    {
      name: RespondStepName.RESPOND,
      state: RespondStepState.ACTIVE,
    },
    {
      name: RespondStepName.CONFIRMATION,
      state: RespondStepState.UPCOMING,
    },
  ])

  const [selectedAction, setSelectedAction] = useState<RespondAction | null>(
    null,
  )

  const setRespondAction = (action: RespondAction) => {
    setSelectedAction(action)
  }

  const setRespondComplete = () => {
    setSteps(prevSteps =>
      prevSteps.map(step => {
        if (step.name === RespondStepName.RESPOND) {
          return { ...step, state: RespondStepState.COMPLETED }
        }
        if (step.name === RespondStepName.CONFIRMATION) {
          return { ...step, state: RespondStepState.ACTIVE }
        }
        return step
      }),
    )
  }

  const editRespond = () => {
    setSteps(prevSteps =>
      prevSteps.map(step => {
        if (step.name === RespondStepName.RESPOND) {
          return { ...step, state: RespondStepState.ACTIVE }
        }
        if (step.name === RespondStepName.CONFIRMATION) {
          return { ...step, state: RespondStepState.UPCOMING }
        }
        return step
      }),
    )
  }

  const value = {
    checkoutTracking,
    artworkPath,
    steps,
    selectedAction,
    setRespondAction,
    setRespondComplete,
    editRespond,
  }

  return (
    <Order2RespondContext.Provider value={value}>
      {children}
    </Order2RespondContext.Provider>
  )
}

export const useRespondContext = () => {
  const context = useContext(Order2RespondContext)
  if (!context) {
    throw new Error(
      "useRespondContext must be used within Order2RespondContextProvider",
    )
  }
  return context
}

const ORDER_FRAGMENT = graphql`
  fragment Order2RespondContext_order on Order {
    internalID
    source
    mode
    lineItems {
      artwork {
        slug
      }
    }
  }
`
