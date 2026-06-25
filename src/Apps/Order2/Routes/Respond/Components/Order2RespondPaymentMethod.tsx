import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import { Flex, Spacer, Text } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import type {
  Order2RespondPaymentMethod_order$data,
  Order2RespondPaymentMethod_order$key,
} from "__generated__/Order2RespondPaymentMethod_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2RespondPaymentMethodProps {
  order: Order2RespondPaymentMethod_order$key
}

/**
 * Read-only (locked) payment-method summary, matching the collapsed/completed
 * view of the Order2 checkout payment step. View-only — no Edit affordance.
 *
 * Unlike checkout, this reads only the saved `paymentMethodDetails` on the
 * order (there is no in-session `confirmationToken` to preview here), which
 * keeps it free of `useCheckoutContext`.
 */
export const Order2RespondPaymentMethod: React.FC<
  Order2RespondPaymentMethodProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const { paymentMethod, paymentMethodDetails } = orderData

  if (!paymentMethod) {
    return null
  }

  const details = getDisplayDetails(paymentMethod, paymentMethodDetails)

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Flex alignItems="center">
        <CheckmarkIcon height={20} width={20} fill="mono100" />
        <Spacer x={0.5} />
        <SectionHeading>Payment</SectionHeading>
      </Flex>

      <Flex alignItems="center" ml="30px" mt={1}>
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

interface PaymentDisplayDetails {
  cardBrand: string | null
  last4: string | null
  bankName: string | null
  formattedExpDate?: string | null
}

const getDisplayDetails = (
  paymentMethod: Order2RespondPaymentMethod_order$data["paymentMethod"],
  savedPaymentMethod: Order2RespondPaymentMethod_order$data["paymentMethodDetails"],
): PaymentDisplayDetails => {
  switch (paymentMethod) {
    case "CREDIT_CARD": {
      if (savedPaymentMethod?.__typename === "CreditCard") {
        const formattedExpDate = `${savedPaymentMethod.expirationMonth
          .toString()
          .padStart(2, "0")}/${savedPaymentMethod.expirationYear
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
      if (savedPaymentMethod?.__typename === "BankAccount") {
        return {
          cardBrand: null,
          last4: savedPaymentMethod.last4,
          bankName: savedPaymentMethod.bankName ?? null,
        }
      }
      break
    }

    case "SEPA_DEBIT": {
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

const FRAGMENT = graphql`
  fragment Order2RespondPaymentMethod_order on Order {
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
