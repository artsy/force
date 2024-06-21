import { Button, Column, GridColumns, Message, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { CreditCardInputProvider } from "Components/CreditCardInput"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { extractNodes } from "Utils/extractNodes"
import { useMode } from "Utils/Hooks/useMode"
import { SettingsPaymentsMethods_me$data } from "__generated__/SettingsPaymentsMethods_me.graphql"
import { SettingsBankAccountFragmentContainer } from "./SettingsBankAccount"
import { SettingsCreditCardFragmentContainer } from "./SettingsCreditCard"
import { SettingsPaymentsMethodForm } from "./SettingsPaymentsMethodForm"

interface SettingsPaymentsMethodsProps {
  me: SettingsPaymentsMethods_me$data
}

type Mode = "Pending" | "Adding"

const SettingsPaymentsMethods: FC<SettingsPaymentsMethodsProps> = ({ me }) => {
  const creditCards = extractNodes(me.creditCards)
  const bankAccounts = extractNodes(me.bankAccounts)

  const [mode, setMode] = useMode<Mode>("Pending")

  const handleClick = () => {
    setMode("Adding")
  }

  const handleClose = () => {
    setMode("Pending")
  }

  return (
    <>
      {mode === "Adding" && (
        <CreditCardInputProvider>
          <SettingsPaymentsMethodForm onClose={handleClose} />
        </CreditCardInputProvider>
      )}

      <Text variant={["md", "lg"]} mb={2}>
        Saved Payment Details
      </Text>

      <Text variant="sm-display" mb={1}>
        Credit cards
      </Text>

      {creditCards.length === 0 ? (
        <Message variant="info">
          You can manage any saved payment methods from here.
        </Message>
      ) : (
        <GridColumns gridRowGap={0}>
          {creditCards.map(creditCard => {
            return (
              <BorderedCell key={creditCard.internalID} span={8} wrap>
                <SettingsCreditCardFragmentContainer creditCard={creditCard} />
              </BorderedCell>
            )
          })}
        </GridColumns>
      )}

      <Button mt={4} onClick={handleClick} disabled={creditCards.length === 0}>
        Add New Card
      </Button>

      {bankAccounts.length > 0 && (
        <>
          <Text variant="sm-display" mt={6} mb={1}>
            Bank accounts
          </Text>

          <GridColumns gridRowGap={0}>
            {bankAccounts.map(bankAccount => {
              return (
                <BorderedCell key={bankAccount.internalID} span={8} wrap>
                  <SettingsBankAccountFragmentContainer
                    bankAccount={bankAccount}
                  />
                </BorderedCell>
              )
            })}
          </GridColumns>
        </>
      )}
    </>
  )
}

const BorderedCell = styled(Column)`
  border: 1px solid ${themeGet("colors.black15")};

  &:not(:first-of-type) {
    border-top: 0;
  }
`

export const SettingsPaymentsMethodsFragmentContainer = createFragmentContainer(
  SettingsPaymentsMethods,
  {
    me: graphql`
      fragment SettingsPaymentsMethods_me on Me {
        creditCards(first: 50) {
          edges {
            node {
              internalID
              ...SettingsCreditCard_creditCard
            }
          }
        }
        bankAccounts(first: 50) {
          edges {
            node {
              internalID
              ...SettingsBankAccount_bankAccount
            }
          }
        }
      }
    `,
  }
)
