import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"

interface Order2PaymentCompletedViewProps {
  confirmationToken: any
}
export const Order2PaymentCompletedView: React.FC<
  Order2PaymentCompletedViewProps
> = ({ confirmationToken }) => {
  const { editPayment, checkoutTracking } = useCheckoutContext()

  const onClickEdit = () => {
    checkoutTracking.clickedChangePaymentMethod()
    editPayment()
  }
  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Payment
          </Text>
        </Flex>
        <Clickable
          textDecoration="underline"
          cursor="pointer"
          type="button"
          onClick={onClickEdit}
        >
          <Text variant="xs" fontWeight="normal" color="mono100">
            Edit
          </Text>
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
