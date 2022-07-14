import { FC, useState } from "react"
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay"
import { Spinner } from "@artsy/palette"
import styled from "styled-components"

import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress" // todo
import { usePoll } from "v2/Utils/Hooks/usePoll"
import {
  PollAccountBalanceQuery,
  PollAccountBalanceQueryResponse,
} from "v2/__generated__/PollAccountBalanceQuery.graphql"
import { PollAccountBalance_commerceBankAccountBalance } from "v2/__generated__/PollAccountBalance_commerceBankAccountBalance.graphql"

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

  // const { balanceCents, currencyCode } = commerceBankAccountBalance!

  // // we receive the balance from Stripe and it's enough to buy the artwork
  // const userHasEnoughBalance =
  //   balanceCents! >= buyerTotalCents && orderCurrencyCode === currencyCode

  // // we receive the balance from Stripe and it's insufficient to buy the artwork
  // const userHasInsufficientBalance =
  //   balanceCents! < buyerTotalCents && orderCurrencyCode === currencyCode

  // // we didn't receive the balance from Stripe and polling time expired
  // const balanceIsNotAvailable =
  //   (!balanceCents || !currencyCode) && shouldStopPolling

  const userHasEnoughBalance =
    commerceBankAccountBalance?.balanceCents &&
    commerceBankAccountBalance?.balanceCents >= buyerTotalCents &&
    orderCurrencyCode === commerceBankAccountBalance?.currencyCode

  // we receive the balance from Stripe and it's insufficient to buy the artwork
  const userHasInsufficientBalance =
    commerceBankAccountBalance?.balanceCents &&
    commerceBankAccountBalance?.balanceCents < buyerTotalCents &&
    orderCurrencyCode === commerceBankAccountBalance?.currencyCode

  // we didn't receive the balance from Stripe and polling time expired
  const balanceIsNotAvailable =
    (!commerceBankAccountBalance?.balanceCents ||
      !commerceBankAccountBalance?.currencyCode) &&
    shouldStopPolling

  // if the user has enough balance or balance is not available, we don't need to display the error
  if (userHasEnoughBalance || balanceIsNotAvailable) {
    clearTimeout(timeoutID)
    onBalanceCheckComplete(false)
  } else if (userHasInsufficientBalance) {
    clearTimeout(timeoutID)
    onBalanceCheckComplete(true)
  }

  return <PollAccountBalancePlaceholder />
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
      placeholder={<PollAccountBalancePlaceholder />}
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

const PollAccountBalancePlaceholder: FC = () => {
  const SpinnerContainer = styled.div`
    width: 100%;
    height: 300px;
    position: relative;
  `
  return (
    <SpinnerContainer>
      <Spinner position="relative" color="brand" />
    </SpinnerContainer>
  )
}
