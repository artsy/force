import {
  Clickable,
  CreditCardIcon,
  Flex,
  Text,
  useToasts,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useMode } from "v2/Utils/Hooks/useMode"
import { SettingsPaymentsMethod_method } from "v2/__generated__/SettingsPaymentsMethod_method.graphql"
import { useDeleteCreditCard } from "../useDeleteCreditCard"

interface SettingsPaymentsMethodProps {
  method: SettingsPaymentsMethod_method
}

type Mode = "Pending" | "Deleting"

const SettingsPaymentsMethod: FC<SettingsPaymentsMethodProps> = ({
  method,
}) => {
  const [mode, setMode] = useMode<Mode>("Pending")

  const { sendToast } = useToasts()
  const { submitMutation } = useDeleteCreditCard()

  const handleClick = async () => {
    setMode("Deleting")

    try {
      await submitMutation({
        variables: { input: { id: method.internalID } },
        rejectIf: res => {
          return res.deleteCreditCard?.creditCardOrError?.mutationError
        },
      })

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

        <Text variant="sm-display" mr={1} display={["none", "block"]}>
          {method.name}
        </Text>

        <Text variant="sm-display" color="black60" mr={1}>
          ••••{method.lastDigits}
        </Text>

        <Text variant="sm-display" color="black60">
          Exp {method.expirationMonth.toString().padStart(2, "0")}/
          {method.expirationYear.toString().slice(-2)}
        </Text>
      </Flex>

      <Clickable onClick={handleClick} disabled={mode === "Deleting"}>
        <Text variant="sm-display" color="red100">
          {mode === "Deleting" ? "Removing" : "Remove"}
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
