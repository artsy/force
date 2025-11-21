import { type FC, useEffect, useRef, useState } from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"

import { SavingPaymentSpinner } from "Apps/Order/Components/SavingPaymentSpinner"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { usePoll } from "Utils/Hooks/usePoll"
import type { Order2PollBankAccountBalanceQuery } from "__generated__/Order2PollBankAccountBalanceQuery.graphql"
import type { Order2PollBankAccountBalance_order$data } from "__generated__/Order2PollBankAccountBalance_order.graphql"

export enum BankAccountBalanceCheckResult {
  SUFFICIENT = "SUFFICIENT",
  INSUFFICIENT = "INSUFFICIENT",
  PENDING = "PENDING",
  TIMEOUT = "TIMEOUT",
  OTHER = "OTHER",
}

interface Order2PollBankAccountBalanceProps {
  relay: RelayRefetchProp
  orderId: string
  order: Order2PollBankAccountBalance_order$data | null | undefined
  onBalanceCheckComplete: (
    result: BankAccountBalanceCheckResult,
    message?: string,
  ) => void
}

const Order2PollBankAccountBalance: FC<
  React.PropsWithChildren<Order2PollBankAccountBalanceProps>
> = ({ relay, orderId, order, onBalanceCheckComplete }) => {
  const [shouldStopPolling, setShouldStopPolling] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Setup timeout once on mount - call callback directly after 10 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setShouldStopPolling(true)
      onBalanceCheckComplete(BankAccountBalanceCheckResult.TIMEOUT)
    }, 10000) // 10 seconds

    // Cleanup: clear timeout if component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [onBalanceCheckComplete])

  usePoll({
    callback: () => {
      relay.refetch({ id: orderId }, null, {}, { force: true })
    },
    intervalTime: 1000, // Poll every 1 second
    key: orderId,
    clearWhen: shouldStopPolling,
  })

  // Check if we have balance check result
  const balanceCheck = order?.bankAccountBalanceCheck

  useEffect(() => {
    if (balanceCheck?.result && !shouldStopPolling) {
      const { result, message } = balanceCheck

      switch (result) {
        case "SUFFICIENT":
          setShouldStopPolling(true)
          onBalanceCheckComplete(BankAccountBalanceCheckResult.SUFFICIENT)
          break
        case "INSUFFICIENT":
          setShouldStopPolling(true)
          onBalanceCheckComplete(
            BankAccountBalanceCheckResult.INSUFFICIENT,
            message || undefined,
          )
          break
        case "PENDING":
          // Continue polling (don't stop or call callback yet)
          break
        default:
          // For all other results, proceed with submission
          setShouldStopPolling(true)
          onBalanceCheckComplete(BankAccountBalanceCheckResult.OTHER)
          break
      }
    }
  }, [balanceCheck, shouldStopPolling, onBalanceCheckComplete])

  return <SavingPaymentSpinner />
}

export const BALANCE_CHECK_QUERY = graphql`
  query Order2PollBankAccountBalanceQuery($id: ID!) {
    me {
      order(id: $id) {
        __typename
        ... on Order {
          ...Order2PollBankAccountBalance_order
        }
      }
    }
  }
`

export const Order2PollBankAccountBalanceRefetchContainer =
  createRefetchContainer(
    Order2PollBankAccountBalance,
    {
      order: graphql`
        fragment Order2PollBankAccountBalance_order on Order {
          internalID
          bankAccountBalanceCheck {
            result
            message
          }
        }
      `,
    },
    BALANCE_CHECK_QUERY,
  )

interface Order2PollBankAccountBalanceQueryRendererProps {
  orderId: string
  onError: (error: Error) => void
  onBalanceCheckComplete: (
    result: BankAccountBalanceCheckResult,
    message?: string,
  ) => void
}

export const Order2PollBankAccountBalanceQueryRenderer: FC<
  React.PropsWithChildren<Order2PollBankAccountBalanceQueryRendererProps>
> = ({ orderId, onError, onBalanceCheckComplete }) => {
  const { relayEnvironment } = useSystemContext()

  if (!orderId) return null

  return (
    <SystemQueryRenderer<Order2PollBankAccountBalanceQuery>
      environment={relayEnvironment}
      placeholder={<SavingPaymentSpinner />}
      variables={{ id: orderId }}
      query={BALANCE_CHECK_QUERY}
      render={({ props, error }) => {
        if (!props?.me?.order) {
          return <SavingPaymentSpinner />
        }

        if (error) {
          onError(error)
        }

        return (
          <Order2PollBankAccountBalanceRefetchContainer
            order={props.me.order}
            orderId={orderId}
            onBalanceCheckComplete={onBalanceCheckComplete}
          />
        )
      }}
    />
  )
}
