import { Stack, Text } from "@artsy/palette"
import type { Order2DetailsMessage_order$key } from "__generated__/Order2DetailsMessage_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2DetailsMessageProps {
  order: Order2DetailsMessage_order$key
}

export const Order2DetailsMessage = ({ order }: Order2DetailsMessageProps) => {
  const orderData = useFragment(FRAGMENT, order)

  return (
    <Stack gap={1}>
      {orderData.displayTexts.message && (
        <Text
          variant="sm"
          dangerouslySetInnerHTML={{
            __html: orderData.displayTexts.message,
          }}
        />
      )}

      <Text variant="sm">
        You will be notified when the work has shipped, typically within 5-7
        business days.
      </Text>
      <Text variant="sm">
        You can contact the gallery with any questions about your order.
      </Text>
    </Stack>
  )
}

const FRAGMENT = graphql`
  fragment Order2DetailsMessage_order on Order {
    displayTexts {
      message
    }
  }
`
