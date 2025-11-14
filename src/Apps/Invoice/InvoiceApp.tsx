import { Box, StackableBorderBox, Text } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import type { InvoiceApp_invoice$key } from "__generated__/InvoiceApp_invoice.graphql"
import { HttpError } from "found"
import { graphql, useFragment } from "react-relay"

interface InvoiceAppProps {
  invoice: InvoiceApp_invoice$key
}

export const InvoiceApp: React.FC<React.PropsWithChildren<InvoiceAppProps>> = ({
  invoice,
  children,
}) => {
  const data = useFragment(InvoiceAppFragment, invoice)

  if (!data) {
    throw new HttpError(404)
  }

  const { number, readyAt } = data

  return (
    <>
      <MetaTags title={`Invoice #${number} | Artsy`} />

      <Box width="50%" margin="auto" p={2}>
        <StackableBorderBox>
          <Text variant="md" fontWeight="bold">
            Invoice #{number}
          </Text>
          <Text data-testid="invoice-info" variant="sm">
            {readyAt}
          </Text>
        </StackableBorderBox>

        {children}
      </Box>
    </>
  )
}

const InvoiceAppFragment = graphql`
  fragment InvoiceApp_invoice on Invoice {
    number
    readyAt(format: "MMM D, YYYY")
  }
`
