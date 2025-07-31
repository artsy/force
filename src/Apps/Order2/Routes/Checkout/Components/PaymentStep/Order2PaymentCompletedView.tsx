import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import HomeIcon from "@artsy/icons/HomeIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"

interface Order2PaymentCompletedViewProps {
  confirmationToken: any
  savedCreditCard: any
}
export const Order2PaymentCompletedView: React.FC<
  Order2PaymentCompletedViewProps
> = ({ confirmationToken, savedCreditCard }) => {
  const { editPayment, checkoutTracking } = useCheckoutContext()

  const onClickEdit = () => {
    checkoutTracking.clickedChangePaymentMethod()
    editPayment()
  }

  const isBankAccount =
    confirmationToken?.paymentMethodPreview?.__typename !== "Card"
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
        {isBankAccount ? (
          <>
            <HomeIcon
              fill="mono100"
              width={["18px", "26px"]}
              height={["18px", "26px"]}
              mr={1}
            />
            <Text variant={["xs", "sm-display"]}>
              •••• {confirmationToken?.paymentMethodPreview?.last4}
            </Text>
          </>
        ) : (
          <>
            <BrandCreditCardIcon
              mr={1}
              type={
                (confirmationToken?.paymentMethodPreview?.displayBrand ||
                  savedCreditCard?.brand) as Brand
              }
              width={["18px", "26px"]}
              height={["18px", "26px"]}
            />
            <Text variant={["xs", "sm-display"]}>
              ••••{" "}
              {confirmationToken?.paymentMethodPreview?.last4 ||
                savedCreditCard?.lastDigits}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}
