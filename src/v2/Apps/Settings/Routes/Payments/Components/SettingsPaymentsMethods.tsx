import { Text, Button, Message, GridColumns, Column } from "@artsy/palette"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CreditCardInputProvider } from "v2/Components/CreditCardInput"
import { extractNodes } from "v2/Utils/extractNodes"
import { SettingsPaymentsMethods_me } from "v2/__generated__/SettingsPaymentsMethods_me.graphql"
import { SettingsPaymentsMethodFragmentContainer } from "./SettingsPaymentsMethod"
import { SettingsPaymentsMethodForm } from "./SettingsPaymentsMethodForm"

enum Mode {
  Pending,
  Adding,
}

interface SettingsPaymentsMethodsProps {
  me: SettingsPaymentsMethods_me
}

const SettingsPaymentsMethods: FC<SettingsPaymentsMethodsProps> = ({ me }) => {
  const methods = extractNodes(me.creditCards)

  const [mode, setMode] = useState(Mode.Pending)

  const handleClick = () => {
    setMode(Mode.Adding)
  }

  const handleClose = () => {
    setMode(Mode.Pending)
  }

  return (
    <>
      {mode === Mode.Adding && (
        <CreditCardInputProvider>
          <SettingsPaymentsMethodForm onClose={handleClose} />
        </CreditCardInputProvider>
      )}

      <Text variant="lg" mb={4}>
        Saved Cards
      </Text>

      {methods.length === 0 ? (
        <Message variant="info">
          Please add a payment card for a faster checkout experience in future.
        </Message>
      ) : (
        <GridColumns>
          {methods.map(method => {
            return (
              <Column key={method.internalID} span={8} wrap>
                <SettingsPaymentsMethodFragmentContainer method={method} />
              </Column>
            )
          })}
        </GridColumns>
      )}

      <Button mt={4} onClick={handleClick}>
        Add a New Card
      </Button>
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
