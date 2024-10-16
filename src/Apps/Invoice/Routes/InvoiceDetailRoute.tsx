import { Box, Button, Join, Separator, Text } from "@artsy/palette"
import { InvoiceDetailRoute_invoice$key } from "__generated__/InvoiceDetailRoute_invoice.graphql"
import { InvoiceLineItems } from "Apps/Invoice/Components/InvoiceLineItems"
import { InvoicePayments } from "Apps/Invoice/Components/InvoicePayments"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"

interface InvoiceDetailRouteProps {
  invoice: InvoiceDetailRoute_invoice$key
}

export const InvoiceDetailRoute: React.FC<InvoiceDetailRouteProps> = ({
  invoice,
}) => {
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
      <Join separator={<Separator my={3} />}>
        <Box display="flex" justifyContent="space-between" width="100%" my={4}>
          <Box>
            <Text variant="sm" fontWeight="bold">
              FROM
            </Text>
            <Text variant="sm">Artsy</Text>
            <br />
            <Text variant="sm">401 Broadway, 25th Floor</Text>
            <Text variant="sm">New York, NY 10013</Text>
          </Box>

          <Box textAlign="right">
            <Text variant="sm" fontWeight="bold">
              TO
            </Text>
            <Text variant="sm">
              <em>Name:</em> {name}
            </Text>
            <br />
            <Text variant="sm">
              <em>Email:</em> {email}
            </Text>
          </Box>
        </Box>

        <InvoiceLineItems invoice={data} />

        {hasSuccessfulPayments && (
          <>
            <InvoicePayments invoice={data} />
          </>
        )}

        <Box display="flex" justifyContent="space-between" width="100%" my={4}>
          <Box>{externalNote && <Text variant="lg">{externalNote}</Text>}</Box>
          <Text textAlign={"right"} variant="lg" fontWeight="bold">
            {remaining}
          </Text>
        </Box>
      </Join>

      {!isPaid && (
        <Box display="flex" justifyContent="center" width="100%">
          <RouterLink to={paymentRoute}>
            <Button>Make Payment</Button>
          </RouterLink>
        </Box>
      )}
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
