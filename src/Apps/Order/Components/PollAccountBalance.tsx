import { FC, useState } from "react"
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay"

import { useSystemContext } from "System"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { renderWithLoadProgress } from "System/Relay/renderWithLoadProgress" // todo
import { usePoll } from "Utils/Hooks/usePoll"
import {
  PollAccountBalanceQuery,
  PollAccountBalanceQueryResponse,
} from "__generated__/PollAccountBalanceQuery.graphql"
import { PollAccountBalance_commerceBankAccountBalance } from "__generated__/PollAccountBalance_commerceBankAccountBalance.graphql"
import { ProcessingPayment } from "./ProcessingPayment"

interface PollAccountBalanceProps {
  relay: RelayRefetchProp
  setupIntentId: string
  commerceBankAccountBalance: PollAccountBalance_commerceBankAccountBalance | null
  onBalanceCheckComplete: (displayInsufficientFundsError: boolean) => void
  buyerTotalCents: number
  orderCurrencyCode: string
}

const PollAccountBalance: FC<PollAccountBalanceProps> = ({
  relay,
  setupIntentId,
  commerceBankAccountBalance,
  onBalanceCheckComplete,
  buyerTotalCents,
  orderCurrencyCode,
}) => {
  const [shouldStopPolling, setShouldStopPolling] = useState(false)
  const timeoutID = setTimeout(() => setShouldStopPolling(true), 5000)

  usePoll({
    callback: () => {
      relay.refetch({ setupIntentId }, null, {}, { force: true })
    },
    intervalTime: 1300,
    key: setupIntentId,
    clearWhen: shouldStopPolling,
  })

  /*
    poll is complete; that means the balance is not available to check so far.
    therefore fire onBalanceCheckComplete with false not to display error
  */
  if (shouldStopPolling) {
    clearTimeout(timeoutID)
    onBalanceCheckComplete(false)
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

    onBalanceCheckComplete(!enoughBalance)
    clearTimeout(timeoutID)
  }

  return <ProcessingPayment />
}

export const BALANCE_QUERY = graphql`
  query PollAccountBalanceQuery($setupIntentId: ID!) {
    commerceBankAccountBalance(setupIntentId: $setupIntentId) {
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
  onBalanceCheckComplete: (displayInsufficientFundsError: boolean) => void
  buyerTotalCents: number
  orderCurrencyCode: string
}

export const PollAccountBalanceQueryRenderer: FC<PollAccountBalanceQueryRendererProps> = ({
  setupIntentId,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()
  if (!setupIntentId) return null

  return (
    <SystemQueryRenderer<PollAccountBalanceQuery>
      environment={relayEnvironment}
      placeholder={<ProcessingPayment />}
      variables={{ setupIntentId }}
      query={BALANCE_QUERY}
      render={renderWithLoadProgress<PollAccountBalanceQueryResponse>(
        ({ commerceBankAccountBalance }) => (
          <PollAccountBalanceRefetchContainer
            commerceBankAccountBalance={commerceBankAccountBalance}
            setupIntentId={setupIntentId}
            {...rest}
          />
        )
      )}
    />
  )
}
