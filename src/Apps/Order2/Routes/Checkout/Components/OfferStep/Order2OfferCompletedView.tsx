import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { Order2OfferCompletedView_order$key } from "__generated__/Order2OfferCompletedView_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2OfferCompletedViewProps {
  order: Order2OfferCompletedView_order$key
  offerAmount: number
  offerNote?: string
}

export const Order2OfferCompletedView: React.FC<
  Order2OfferCompletedViewProps
> = ({ order, offerAmount, offerNote }) => {
  const orderData = useFragment(FRAGMENT, order)
  const { editOfferAmount } = useCheckoutContext()

  const onClickEdit = () => {
    // TODO: Add tracking when available
    editOfferAmount()
  }

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Offer
          </Text>
        </Flex>
        <Clickable
          textDecoration="underline"
          cursor="pointer"
          type="button"
          onClick={onClickEdit}
        >
          <Text variant="sm" fontWeight="normal" color="mono100">
            Edit
          </Text>
        </Clickable>
      </Flex>

      <Flex
        flexDirection="column"
        data-testid="offer-step-completed"
        ml="30px"
        mt={1}
      >
        <Text variant="sm-display" color="mono100">
          {appendCurrencySymbol(
            offerAmount.toLocaleString("en-US", {
              currency: orderData.currencyCode,
              minimumFractionDigits: 2,
              style: "currency",
            }),
            orderData.currencyCode,
          )}
        </Text>
        {offerNote && (
          <Text variant="sm-display" color="mono100">
            {offerNote}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2OfferCompletedView_order on Order {
    currencyCode
  }
`
