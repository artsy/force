import { Spacer, StackableBorderBox, Text } from "@artsy/palette"
import { InvoicePaymentForm } from "Apps/Invoice/Components/InvoicePaymentForm"
import { CreditCardInputProvider } from "Components/CreditCardInput"
import { useRouter } from "System/Hooks/useRouter"
import type { InvoicePaymentRoute_invoice$key } from "__generated__/InvoicePaymentRoute_invoice.graphql"
import { graphql, useFragment } from "react-relay"

interface InvoicePaymentRouteProps {
  invoice: InvoicePaymentRoute_invoice$key
}

export const InvoicePaymentRoute: React.FC<
  React.PropsWithChildren<InvoicePaymentRouteProps>
> = ({ invoice }) => {
  const data = useFragment(InvoicePaymentRouteFragment, invoice)

  const { remaining, internalID, remainingMinor } = data
  const { match } = useRouter()
  const token = match.params.token

  return (
    <>
      <StackableBorderBox>
        <Text data-testid="invoice-payment-info" variant="md">
          Make a payment: {remaining}
        </Text>

        <Spacer y={2} />

        <CreditCardInputProvider>
          <InvoicePaymentForm
            amountMinor={remainingMinor}
            invoiceID={internalID}
            invoiceToken={token}
          />
        </CreditCardInputProvider>
      </StackableBorderBox>
    </>
  )
}

const InvoicePaymentRouteFragment = graphql`
  fragment InvoicePaymentRoute_invoice on Invoice {
    remaining(precision: 2)
    internalID
    remainingMinor
  }
`
