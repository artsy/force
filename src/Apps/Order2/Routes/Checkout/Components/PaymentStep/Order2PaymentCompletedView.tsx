import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"

interface Order2PaymentCompletedViewProps {
  confirmationToken: any
  onClickEdit: () => void
}
export const Order2PaymentCompletedView: React.FC<
  Order2PaymentCompletedViewProps
> = ({ confirmationToken, onClickEdit }) => {
  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <Text variant="sm-display" fontWeight="bold" color="mono100">
            Payment
          </Text>
        </Flex>
        <Clickable
          textDecoration="underline"
          cursor="pointer"
          type="button"
          onClick={onClickEdit}
        >
          Edit
        </Clickable>
      </Flex>
      <Flex alignItems="center" ml="30px" mt={1}>
        <BrandCreditCardIcon
          mr={1}
          type={
            confirmationToken?.paymentMethodPreview?.card?.displayBrand as Brand
          }
          width="26px"
          height="26px"
        />
        <Text variant="sm-display">
          •••• {confirmationToken?.paymentMethodPreview?.card?.last4}
        </Text>
      </Flex>
    </Flex>
  )
}
