import { Box, Join, Separator, Text } from "@artsy/palette"
import type { InvoiceLineItems_invoice$key } from "__generated__/InvoiceLineItems_invoice.graphql"
import { graphql, useFragment } from "react-relay"

interface InvoiceLineItemsProps {
  invoice: InvoiceLineItems_invoice$key
}

export const InvoiceLineItems: React.FC<
  React.PropsWithChildren<InvoiceLineItemsProps>
> = ({ invoice }) => {
  const data = useFragment(InvoiceLineItemsFragment, invoice)

  return (
    <Box>
      <Text variant="sm" fontWeight="bold">
        Items
      </Text>

      <Join separator={<Separator my={2} />}>
        {data.lineItems.map(({ description, amount }, index) => (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              mt={index === 0 ? 2 : 1}
            >
              <Text variant="sm">{description}</Text>
              <Text variant="sm">{amount}</Text>
            </Box>
          </>
        ))}
      </Join>
    </Box>
  )
}

const InvoiceLineItemsFragment = graphql`
  fragment InvoiceLineItems_invoice on Invoice {
    lineItems {
      description
      amount(precision: 2)
    }
  }
`
