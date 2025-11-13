import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"

interface Order2PaymentCompletedViewProps {
  confirmationToken: any
  savedPaymentMethod: any
}
export const Order2PaymentCompletedView: React.FC<
  Order2PaymentCompletedViewProps
> = ({ confirmationToken, savedPaymentMethod }) => {
  const { editPayment, checkoutTracking } = useCheckoutContext()

  const onClickEdit = () => {
    checkoutTracking.clickedChangePaymentMethod()
    editPayment()
  }

  const isCreditCard =
    confirmationToken?.paymentMethodPreview?.__typename === "Card" ||
    savedPaymentMethod?.__typename === "CreditCard"
  const isBankAccount =
    confirmationToken?.paymentMethodPreview?.__typename === "USBankAccount" ||
    savedPaymentMethod?.type === "US_BANK_ACCOUNT"
  const isSEPA =
    confirmationToken?.paymentMethodPreview?.__typename === "SEPADebit" ||
    savedPaymentMethod?.type === "SEPA_DEBIT"
  const isWireTransfer = !isCreditCard && !isBankAccount && !isSEPA

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
          <Text variant="sm" fontWeight="normal" color="mono100">
            Edit
          </Text>
        </Clickable>
      </Flex>
      <Flex alignItems="center" ml="30px" mt={1}>
        {(isBankAccount || isSEPA) && (
          <>
            <InstitutionIcon fill="mono100" width="24px" height="24px" mr={1} />
            <Text variant="sm-display">
              ••••{" "}
              {confirmationToken?.paymentMethodPreview?.last4 ||
                savedPaymentMethod?.last4}
            </Text>
          </>
        )}
        {isCreditCard && (
          <>
            <BrandCreditCardIcon
              mr={1}
              type={
                (confirmationToken?.paymentMethodPreview?.displayBrand ||
                  savedPaymentMethod?.brand) as Brand
              }
              width="24px"
              height="24px"
            />
            <Text variant="sm-display">
              ••••{" "}
              {confirmationToken?.paymentMethodPreview?.last4 ||
                savedPaymentMethod?.lastDigits}
            </Text>
          </>
        )}
        {isWireTransfer && (
          <>
            <InstitutionIcon fill="mono100" width="24px" height="24px" mr={1} />
            <Text variant="sm-display">Wire Transfer</Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}
