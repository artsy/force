import { Box, Join, Separator, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { InvoiceLineItems_invoice$key } from "__generated__/InvoiceLineItems_invoice.graphql"

interface InvoiceLineItemsProps {
  invoice: InvoiceLineItems_invoice$key
}

export const InvoiceLineItems: React.FC<InvoiceLineItemsProps> = ({
  invoice,
}) => {
  const data = useFragment(InvoiceLineItemsFragment, invoice)

  return (
    <Box my={4}>
      <Text variant="lg" fontWeight="bold">
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
