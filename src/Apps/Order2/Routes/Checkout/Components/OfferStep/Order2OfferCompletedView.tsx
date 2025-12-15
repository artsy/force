import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import createLogger from "Utils/logger"

const logger = createLogger(
  "Order2/Routes/Checkout/Components/OfferStep/Order2OfferCompletedView.tsx",
)

export interface Order2OfferCompletedViewProps {
  lastOfferAmount: string
  lastOfferNote: string | null
}

export const Order2OfferCompletedView: React.FC<
  Order2OfferCompletedViewProps
> = ({ lastOfferAmount, lastOfferNote }) => {
  const { editOfferAmount } = useCheckoutContext()

  if (!lastOfferAmount) {
    logger.warn("No offer amount provided for Order2OfferCompletedView")
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
            variant={["sm-display", "sm-display", "md"]}
            fontWeight={["bold", "bold", "normal"]}
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
        <Text variant="sm" color="mono100">
          {lastOfferAmount}
        </Text>
        {lastOfferNote && (
          <Text
            variant="sm-display"
            color="mono100"
            lineClamp={4}
            style={{ wordBreak: "break-word" }}
          >
            {lastOfferNote}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}
