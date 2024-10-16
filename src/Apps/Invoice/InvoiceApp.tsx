import { Box, Separator, Spacer, Text } from "@artsy/palette"
import { InvoiceApp_invoice$key } from "__generated__/InvoiceApp_invoice.graphql"
import { HttpError } from "found"
import { graphql, useFragment } from "react-relay"

interface InvoiceAppProps {
  invoice: InvoiceApp_invoice$key
}

export const InvoiceApp: React.FC<InvoiceAppProps> = ({
  invoice,
  children,
}) => {
  const data = useFragment(InvoiceAppFragment, invoice)

  if (!data) {
    throw new HttpError(404)
  }

  const { number, readyAt } = data

  return (
    <Box mx={4}>
      <Spacer y={4} />

      <Box textAlign={"right"}>
        <Text variant="xl" textTransform={"uppercase"}>
          Invoice
        </Text>
        <Text variant="sm">
          <em>Invoice</em> #{number}
          <br />
          <em>Date:</em> {readyAt}
        </Text>
      </Box>

      <Spacer y={4} />

      <Separator my={3} />

      {children}
    </Box>
  )
}

const InvoiceAppFragment = graphql`
  fragment InvoiceApp_invoice on Invoice {
    number
    readyAt(format: "MMM D, YYYY")
  }
`
