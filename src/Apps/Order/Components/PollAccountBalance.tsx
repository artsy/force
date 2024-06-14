import { FC, useState } from "react"
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay"

import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { usePoll } from "Utils/Hooks/usePoll"
import { PollAccountBalanceQuery } from "__generated__/PollAccountBalanceQuery.graphql"
import { PollAccountBalance_commerceBankAccountBalance$data } from "__generated__/PollAccountBalance_commerceBankAccountBalance.graphql"
import { BalanceCheckResult } from "Apps/Order/Routes/Payment/index"
import { SavingPaymentSpinner } from "Apps/Order/Components/SavingPaymentSpinner"

interface PollAccountBalanceProps {
  relay: RelayRefetchProp
  setupIntentId: string
  bankAccountId: string
  commerceBankAccountBalance:
    | PollAccountBalance_commerceBankAccountBalance$data
    | null
    | undefined
  onBalanceCheckComplete: (
    displayInsufficientFundsError: boolean,
    checkResult: BalanceCheckResult
  ) => void
  buyerTotalCents: number
  orderCurrencyCode: string
}

const PollAccountBalance: FC<PollAccountBalanceProps> = ({
  relay,
  setupIntentId,
  bankAccountId,
  commerceBankAccountBalance,
  onBalanceCheckComplete,
  buyerTotalCents,
  orderCurrencyCode,
}) => {
  const [shouldStopPolling, setShouldStopPolling] = useState(false)
  const timeoutID = setTimeout(() => setShouldStopPolling(true), 5000)

  usePoll({
    callback: () => {
      relay.refetch({ setupIntentId, bankAccountId }, null, {}, { force: true })
    },
    intervalTime: 1600,
    key: setupIntentId || bankAccountId,
    clearWhen: shouldStopPolling,
  })

  /*
    poll is complete; that means the balance is not available to check so far.
    therefore fire onBalanceCheckComplete with false not to display error
  */
  if (shouldStopPolling) {
    clearTimeout(timeoutID)
    onBalanceCheckComplete(false, BalanceCheckResult.check_not_possible)
  }

  /*
    check to see if balance and currency available from Stripe
    stringfy balanceCents since we want to treat it as available balance when 0
  */
  if (
    commerceBankAccountBalance &&
    commerceBankAccountBalance?.balanceCents?.toString() &&
    commerceBankAccountBalance?.currencyCode
  ) {
    // make the check and fire onBalanceCheckComplete with the check result
    const { balanceCents, currencyCode } = commerceBankAccountBalance

    const enoughBalance = !!(
      balanceCents >= buyerTotalCents && currencyCode === orderCurrencyCode
    )

    onBalanceCheckComplete(
      !enoughBalance,
      enoughBalance ? BalanceCheckResult.success : BalanceCheckResult.failed
    )
    clearTimeout(timeoutID)
  }

  return <SavingPaymentSpinner />
}

export const BALANCE_QUERY = graphql`
  query PollAccountBalanceQuery($setupIntentId: ID, $bankAccountId: ID) {
    commerceBankAccountBalance(
      setupIntentId: $setupIntentId
      bankAccountId: $bankAccountId
    ) {
      ...PollAccountBalance_commerceBankAccountBalance
    }
  }
`

export const PollAccountBalanceRefetchContainer = createRefetchContainer(
  PollAccountBalance,
  {
    commerceBankAccountBalance: graphql`
      fragment PollAccountBalance_commerceBankAccountBalance on CommerceBankAccountBalance {
        balanceCents
        currencyCode
      }
    `,
  },
  BALANCE_QUERY
)

interface PollAccountBalanceQueryRendererProps {
  setupIntentId: string
  bankAccountId: string
  onError: (error: Error) => void
  onBalanceCheckComplete: (
    displayInsufficientFundsError: boolean,
    checkResult: BalanceCheckResult
  ) => void
  buyerTotalCents: number
  orderCurrencyCode: string
}

export const PollAccountBalanceQueryRenderer: FC<PollAccountBalanceQueryRendererProps> = ({
  setupIntentId,
  bankAccountId,
  onError,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()
  if (!setupIntentId && !bankAccountId) return null

  return (
    <SystemQueryRenderer<PollAccountBalanceQuery>
      environment={relayEnvironment}
      placeholder={<SavingPaymentSpinner />}
      variables={
        bankAccountId ? { bankAccountId } : { setupIntentId, bankAccountId: "" }
      }
      query={BALANCE_QUERY}
      render={({ props, error }) => {
        if (!props?.commerceBankAccountBalance) {
          return <SavingPaymentSpinner />
        }

        if (error) {
          onError(error)
        }

        return (
          <PollAccountBalanceRefetchContainer
            commerceBankAccountBalance={props.commerceBankAccountBalance}
            setupIntentId={setupIntentId}
            bankAccountId={bankAccountId}
            {...rest}
          />
        )
      }}
    />
  )
}
