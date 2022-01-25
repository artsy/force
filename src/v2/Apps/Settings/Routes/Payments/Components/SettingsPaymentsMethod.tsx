import {
  Clickable,
  CreditCardIcon,
  Flex,
  Text,
  useToasts,
} from "@artsy/palette"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsPaymentsMethod_method } from "v2/__generated__/SettingsPaymentsMethod_method.graphql"
import { useDeleteCreditCard } from "../useDeleteCreditCard"

enum Mode {
  Pending,
  Deleting,
}

interface SettingsPaymentsMethodProps {
  method: SettingsPaymentsMethod_method
}

const SettingsPaymentsMethod: FC<SettingsPaymentsMethodProps> = ({
  method,
}) => {
  const [mode, setMode] = useState(Mode.Pending)

  const { sendToast } = useToasts()
  const { submitMutation } = useDeleteCreditCard()

  const handleClick = async () => {
    setMode(Mode.Deleting)

    try {
      await submitMutation(
        { input: { id: method.internalID } },
        {
          checkForErrors: res => {
            res.deleteCreditCard?.creditCardOrError?.mutationError
          },
        }
      )

      sendToast({
        variant: "success",
        message: "Successfully deleted credit card.",
      })
    } catch (err) {
      console.error(err)

      const error = Array.isArray(err) ? err[0] : err

      sendToast({
        variant: "error",
        message: "Something went wrong.",
        description: error.message,
      })
    }
  }

  return (
    <Flex
      border="1px solid"
      borderColor="black10"
      p={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex alignItems="center">
        <CreditCardIcon
          type={method.brand}
          width={20}
          height={20}
          aria-label={method.brand}
          mr={2}
        />

        <Text variant="md" mr={1}>
          {method.name}
        </Text>

        <Text variant="md" color="black60" mr={1}>
          ••••{method.lastDigits}
        </Text>

        <Text variant="md" color="black60">
          Exp {method.expirationMonth.toString().padStart(2, "0")}/
          {method.expirationYear.toString().slice(-2)}
        </Text>
      </Flex>

      <Clickable onClick={handleClick} disabled={mode === Mode.Deleting}>
        <Text variant="md" color="red100">
          {mode === Mode.Deleting ? "Removing" : "Remove"}
        </Text>
      </Clickable>
    </Flex>
  )
}

export const SettingsPaymentsMethodFragmentContainer = createFragmentContainer(
  SettingsPaymentsMethod,
  {
    method: graphql`
      fragment SettingsPaymentsMethod_method on CreditCard {
        internalID
        name
        brand
        lastDigits
        expirationYear
        expirationMonth
      }
    `,
  }
)
