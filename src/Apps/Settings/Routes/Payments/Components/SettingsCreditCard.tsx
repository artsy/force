import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsCreditCard_creditCard$data } from "__generated__/SettingsCreditCard_creditCard.graphql"
import { useDeleteCreditCard } from "Apps/Settings/Routes/Payments/useDeleteCreditCard"
import { SettingsPaymentsMethod } from "./SettingsPaymentsMethod"
import { Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"

interface SettingsCreditCardProps {
  creditCard: SettingsCreditCard_creditCard$data
}
const SettingsCreditCard: React.FC<SettingsCreditCardProps> = ({
  creditCard,
}) => {
  const {
    internalID,
    brand,
    name,
    lastDigits,
    expirationMonth,
    expirationYear,
  } = creditCard
  const { submitMutation } = useDeleteCreditCard()

  const handleDelete = async () => {
    await submitMutation({
      variables: { input: { id: internalID } },
      rejectIf: res => {
        return res.deleteCreditCard?.creditCardOrError?.mutationError
      },
    })
  }

  return (
    <SettingsPaymentsMethod
      successDeleteMessage="Successfully deleted credit card."
      onDelete={handleDelete}
    >
      <BrandCreditCardIcon
        type={brand as Brand}
        width={24}
        height={24}
        aria-label={brand}
        mr={1}
      />

      <Text variant="sm-display" mr={1} display={["none", "block"]}>
        {name}
      </Text>

      <Text variant="sm-display" color="black60" mr={1}>
        •••• {lastDigits}
      </Text>

      <Text variant="sm-display" color="black60">
        Exp {expirationMonth.toString().padStart(2, "0")}/
        {expirationYear.toString().slice(-2)}
      </Text>
    </SettingsPaymentsMethod>
  )
}

export const SettingsCreditCardFragmentContainer = createFragmentContainer(
  SettingsCreditCard,
  {
    creditCard: graphql`
      fragment SettingsCreditCard_creditCard on CreditCard {
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
