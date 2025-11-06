import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { mostRecentCreatedAt } from "Apps/Order2/Routes/Checkout/Utils/mostRecentCreatedAt"
import createLogger from "Utils/logger"
import type { Order2OfferCompletedView_order$key } from "__generated__/Order2OfferCompletedView_order.graphql"
import { graphql, useFragment } from "react-relay"

const logger = createLogger(
  "Order2/Routes/Checkout/Components/OfferStep/Order2OfferCompletedView.tsx",
)

interface Order2OfferCompletedViewProps {
  order: Order2OfferCompletedView_order$key
}

export const Order2OfferCompletedView: React.FC<
  Order2OfferCompletedViewProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const { editOfferAmount } = useCheckoutContext()

  const lastOffer = mostRecentCreatedAt(orderData.offers)
  if (!lastOffer?.amount?.display) {
    logger.warn("No offers found for Order2OfferCompletedView")
    return null
  }

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
          {lastOffer.amount?.display}
        </Text>
        {lastOffer.note && (
          <Text variant="sm-display" color="mono100">
            {lastOffer.note}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2OfferCompletedView_order on Order {
    currencyCode
    offers {
      createdAt
      note
      amount {
        display
      }
    }
  }
`
