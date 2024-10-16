import { Box, Text } from "@artsy/palette"
import { InvoicePaymentRoute_invoice$key } from "__generated__/InvoicePaymentRoute_invoice.graphql"
import { InvoicePaymentForm } from "Apps/Invoice/Components/InvoicePaymentForm"
import { CreditCardInputProvider } from "Components/CreditCardInput"
import { graphql, useFragment } from "react-relay"
import { useRouter } from "System/Hooks/useRouter"

interface InvoicePaymentRouteProps {
  invoice: InvoicePaymentRoute_invoice$key
}

export const InvoicePaymentRoute: React.FC<InvoicePaymentRouteProps> = ({
  invoice,
}) => {
  const data = useFragment(InvoicePaymentRouteFragment, invoice)

  const { remaining, internalID, remainingMinor } = data
  const { match } = useRouter()
  const token = match.params.token

  return (
    <Box display="flex" justifyContent="center" width="100%" my={4}>
      <Text variant={"xl"} fontWeight={"bold"} mr={2}>
        Make a payment:
        <br />
        {remaining}
      </Text>

      <CreditCardInputProvider>
        <InvoicePaymentForm
          amountMinor={remainingMinor}
          invoiceID={internalID}
          invoiceToken={token}
        />
      </CreditCardInputProvider>
    </Box>
  )
}

const InvoicePaymentRouteFragment = graphql`
  fragment InvoicePaymentRoute_invoice on Invoice {
    remaining(precision: 2)
    internalID
    remainingMinor
  }
`
