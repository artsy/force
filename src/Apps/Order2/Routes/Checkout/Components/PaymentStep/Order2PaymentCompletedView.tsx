import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import type {
  Order2PaymentCompletedView_order$data,
  Order2PaymentCompletedView_order$key,
} from "__generated__/Order2PaymentCompletedView_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2PaymentCompletedViewProps {
  order: Order2PaymentCompletedView_order$key
}

export const Order2PaymentCompletedView: React.FC<
  Order2PaymentCompletedViewProps
> = ({ order }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const { editPayment, checkoutTracking, confirmationToken } =
    useCheckoutContext()

  const onClickEdit = () => {
    checkoutTracking.clickedChangePaymentMethod()
    editPayment()
  }

  const savedPaymentMethod = orderData.paymentMethodDetails
  const paymentPreview = confirmationToken?.paymentMethodPreview
  const paymentMethod = orderData.paymentMethod

  const details = getDisplayDetails(
    paymentMethod,
    paymentPreview,
    savedPaymentMethod,
  )

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <SectionHeading>Payment</SectionHeading>
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
        {/* Bank Account (ACH or SEPA) */}
        {(paymentMethod === "US_BANK_ACCOUNT" ||
          paymentMethod === "SEPA_DEBIT") &&
          details.last4 && (
            <>
              <InstitutionIcon
                fill="mono100"
                width="24px"
                height="24px"
                mr={1}
              />
              <Text variant="sm-display">
                {details.bankName && `${details.bankName} `}
                •••• {details.last4}
              </Text>
            </>
          )}

        {/* Credit Card */}
        {paymentMethod === "CREDIT_CARD" &&
          details.cardBrand &&
          details.last4 && (
            <>
              <BrandCreditCardIcon
                mr={1}
                type={details.cardBrand as Brand}
                width="24px"
                height="24px"
              />
              <Text variant="sm-display">
                •••• {details.last4}
                {details.formattedExpDate && ` Exp ${details.formattedExpDate}`}
              </Text>
            </>
          )}

        {/* Wire Transfer */}
        {paymentMethod === "WIRE_TRANSFER" && (
          <>
            <InstitutionIcon fill="mono100" width="24px" height="24px" mr={1} />
            <Text variant="sm-display">Wire transfer</Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}

const getDisplayDetails = (
  paymentMethod: Order2PaymentCompletedView_order$data["paymentMethod"],
  paymentPreview: NonNullable<
    ReturnType<typeof useCheckoutContext>["confirmationToken"]
  >["paymentMethodPreview"],
  savedPaymentMethod: Order2PaymentCompletedView_order$data["paymentMethodDetails"],
) => {
  switch (paymentMethod) {
    case "CREDIT_CARD": {
      if (paymentPreview && paymentPreview.__typename === "Card") {
        const cardBrand = paymentPreview.displayBrand
          ?.replace(/_/g, " ")
          .replace(/\b\w/g, char => char.toUpperCase())

        return {
          cardBrand: cardBrand,
          last4: paymentPreview.last4,
          bankName: null,
        }
      }

      if (savedPaymentMethod?.__typename === "CreditCard") {
        const formattedExpDate = `${savedPaymentMethod.expirationMonth.toString().padStart(2, "0")}/${savedPaymentMethod.expirationYear
          .toString()
          .slice(-2)}`

        return {
          cardBrand: savedPaymentMethod.brand,
          last4: savedPaymentMethod.lastDigits,
          bankName: null,
          formattedExpDate,
        }
      }
      break
    }

    case "US_BANK_ACCOUNT": {
      if (paymentPreview && paymentPreview.__typename === "USBankAccount") {
        return {
          cardBrand: null,
          last4: paymentPreview.last4,
          bankName: paymentPreview.bankName,
        }
      }

      if (savedPaymentMethod?.__typename === "BankAccount") {
        return {
          cardBrand: null,
          last4: savedPaymentMethod.last4,
          bankName: savedPaymentMethod.bankName,
        }
      }
      break
    }

    case "SEPA_DEBIT": {
      if (paymentPreview && paymentPreview.__typename === "SEPADebit") {
        return {
          cardBrand: null,
          last4: paymentPreview.last4,
          bankName: null,
        }
      }

      if (savedPaymentMethod?.__typename === "BankAccount") {
        return {
          cardBrand: null,
          last4: savedPaymentMethod.last4,
          bankName: null,
        }
      }
      break
    }
  }

  return { cardBrand: null, last4: null, bankName: null }
}

const ORDER_FRAGMENT = graphql`
  fragment Order2PaymentCompletedView_order on Order {
    paymentMethod
    paymentMethodDetails {
      __typename
      ... on CreditCard {
        brand
        lastDigits
        expirationYear
        expirationMonth
      }
      ... on BankAccount {
        last4
        bankName
      }
      ... on WireTransfer {
        isManualPayment
      }
    }
  }
`
