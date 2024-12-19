import {
  Box,
  Button,
  Flex,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { InvoiceLineItems } from "Apps/Invoice/Components/InvoiceLineItems"
import { InvoicePayments } from "Apps/Invoice/Components/InvoicePayments"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import type { InvoiceDetailRoute_invoice$key } from "__generated__/InvoiceDetailRoute_invoice.graphql"
import { graphql, useFragment } from "react-relay"

interface InvoiceDetailRouteProps {
  invoice: InvoiceDetailRoute_invoice$key
}

export const InvoiceDetailRoute: React.FC<
  React.PropsWithChildren<InvoiceDetailRouteProps>
> = ({ invoice }) => {
  const data = useFragment(InvoiceDetailRouteFragment, invoice)

  const { name, email, state, payments, externalNote, remaining } = data

  const hasSuccessfulPayments =
    payments.filter(({ successful }) => successful).length > 0

  const isPaid = state === "PAID"
  const { match } = useRouter()
  const token = match.params.token
  const paymentRoute = `/invoice/${token}/payment`

  return (
    <>
      <StackableBorderBox>
        <Flex justifyContent="space-between">
          <Box>
            <Text variant="sm" fontWeight="bold">
              From
            </Text>
            <Text variant="sm">Artsy</Text>
          </Box>
          <Box>
            <Text variant="sm">401 Broadway, 25th Floor</Text>
            <Text variant="sm">New York, NY 10013</Text>
          </Box>
        </Flex>
      </StackableBorderBox>
      <StackableBorderBox>
        <Text variant="sm" fontWeight="bold">
          To
        </Text>
        <Text data-testid="invoice-name" variant="sm">
          {name} {"<"}
          {email}
          {">"}
        </Text>
      </StackableBorderBox>

      <StackableBorderBox>
        <InvoiceLineItems invoice={data} />
      </StackableBorderBox>

      {hasSuccessfulPayments && (
        <StackableBorderBox>
          <InvoicePayments invoice={data} />
        </StackableBorderBox>
      )}

      <StackableBorderBox>
        <Flex justifyContent="space-between">
          {externalNote && <Text variant="lg">{externalNote}</Text>}

          <Text variant="lg" fontWeight="bold">
            {remaining}
          </Text>
        </Flex>

        <Spacer y={4} />

        {!isPaid && (
          <Box display="flex" justifyContent="center" width="100%">
            <Button
              // @ts-ignore
              as={RouterLink}
              to={paymentRoute}
              width="100%"
            >
              Make Payment
            </Button>
          </Box>
        )}
      </StackableBorderBox>
    </>
  )
}

const InvoiceDetailRouteFragment = graphql`
  fragment InvoiceDetailRoute_invoice on Invoice {
    name
    email
    state

    payments {
      successful
    }

    externalNote
    remaining(precision: 2)

    ...InvoiceLineItems_invoice
    ...InvoicePayments_invoice
  }
`
