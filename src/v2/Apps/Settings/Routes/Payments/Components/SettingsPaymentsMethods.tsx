import {
  Text,
  Button,
  Flex,
  Message,
  GridColumns,
  Column,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CreditCardInputProvider } from "v2/Components/CreditCardInput"
import { extractNodes } from "v2/Utils/extractNodes"
import { useMode } from "v2/Utils/Hooks/useMode"
import { SettingsPaymentsMethods_me } from "v2/__generated__/SettingsPaymentsMethods_me.graphql"
import { SettingsPaymentsMethodFragmentContainer } from "./SettingsPaymentsMethod"
import { SettingsPaymentsMethodForm } from "./SettingsPaymentsMethodForm"

interface SettingsPaymentsMethodsProps {
  me: SettingsPaymentsMethods_me
}

type Mode = "Pending" | "Adding"

const SettingsPaymentsMethods: FC<SettingsPaymentsMethodsProps> = ({ me }) => {
  const methods = extractNodes(me.creditCards)

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

      <Text variant="lg-display" mb={4}>
        Saved Cards
      </Text>

      {methods.length === 0 ? (
        <Message variant="info">
          Please add a payment card for a faster checkout experience in future.
        </Message>
      ) : (
        <Flex flexDirection="column">
          <Text mb={2}>Credit Cards</Text>
          <GridColumns>
            {methods.map(method => {
              return (
                <Column key={method.internalID} span={8} wrap>
                  <SettingsPaymentsMethodFragmentContainer method={method} />
                </Column>
              )
            })}
          </GridColumns>
        </Flex>
      )}

      <Button mt={4} mb={4} onClick={handleClick}>
        Add New Card
      </Button>

      <Flex flexDirection="column">
        <Text mb={2}>Bank transfer (US bank account)</Text>
        {/*  TODO: replace with bank account instead of credit card */}
        <GridColumns>
          {methods.map(method => {
            return (
              <Column key={method.internalID} span={8} wrap>
                <SettingsPaymentsMethodFragmentContainer method={method} />
              </Column>
            )
          })}
        </GridColumns>
      </Flex>
    </>
  )
}

export const SettingsPaymentsMethodsFragmentContainer = createFragmentContainer(
  SettingsPaymentsMethods,
  {
    me: graphql`
      fragment SettingsPaymentsMethods_me on Me {
        creditCards(first: 50) {
          edges {
            node {
              internalID
              ...SettingsPaymentsMethod_method
            }
          }
        }
      }
    `,
  }
)
