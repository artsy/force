import { Box, Column, GridColumns, Join, Separator, Text } from "@artsy/palette"
import type { InvoicePayments_invoice$key } from "__generated__/InvoicePayments_invoice.graphql"
import { graphql, useFragment } from "react-relay"

interface InvoiceLineItemsProps {
  invoice: InvoicePayments_invoice$key
}

export const InvoicePayments: React.FC<
  React.PropsWithChildren<InvoiceLineItemsProps>
> = ({ invoice }) => {
  const data = useFragment(InvoicePaymentsFragment, invoice)

  return (
    <Box my={4}>
      <Text variant="lg" fontWeight="bold">
        Payments
      </Text>

      <Join separator={<Separator />}>
        {data.payments
          .filter(({ successful }) => successful)
          .map(({ id, createdAt, amount, creditCard }, _index) => {
            const creditCardInfo = creditCard
              ? `${creditCard.brand} ending in ${creditCard.lastDigits}`
              : null
            return (
              <>
                <GridColumns my={2} key={id}>
                  <Column span={2}>
                    <Text variant="sm">{createdAt}</Text>
                  </Column>
                  <Column span={6}>
                    {creditCardInfo && (
                      <Text variant="sm" textAlign={"center"}>
                        {creditCardInfo}
                      </Text>
                    )}
                  </Column>
                  <Column span={4}>
                    <Text variant="sm" textAlign={"right"}>
                      {amount}
                    </Text>
                  </Column>
                </GridColumns>
              </>
            )
          })}
      </Join>
    </Box>
  )
}

const InvoicePaymentsFragment = graphql`
  fragment InvoicePayments_invoice on Invoice {
    payments {
      id
      successful
      createdAt(format: "MMM D, YYYY")
      amount(precision: 2)
      creditCard {
        brand
        lastDigits
      }
    }
  }
`
