import {
  BorderedRadio,
  Button,
  Flex,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import type { RespondAction } from "Apps/Order2/Routes/Respond/RespondContext/types"
import type { Order2RespondForm_order$key } from "__generated__/Order2RespondForm_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2RespondFormProps {
  order: Order2RespondForm_order$key
}

const RESPOND_OPTIONS: Array<{ value: RespondAction; label: string }> = [
  { value: "APPROVE", label: "Accept gallery offer" },
  { value: "COUNTEROFFER", label: "Send counteroffer" },
  { value: "DECLINE", label: "Decline gallery offer" },
]

export const Order2RespondForm: React.FC<Order2RespondFormProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const { selectedAction, setRespondAction, setRespondComplete } =
    useRespondContext()

  const offerAmount = orderData.pendingOffer?.amount?.display
  // `currentOfferPrice` mirrors the legacy `order.itemsTotalCents`
  const currentOfferPrice = orderData.itemsTotal?.display

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Text variant={["md", "lg-display"]}>Respond to gallery offer</Text>

      {offerAmount && (
        <>
          <Spacer y={1} />
          <Text variant={["lg-display", "xl"]}>{offerAmount}</Text>
        </>
      )}

      {currentOfferPrice && (
        <>
          <Spacer y={1} />
          <Text variant="sm" color="mono60">
            {currentOfferPrice}
          </Text>
        </>
      )}

      <Spacer y={2} />

      <RadioGroup
        onSelect={value => {
          setRespondAction(value as RespondAction)
        }}
        defaultValue={selectedAction ?? undefined}
      >
        {RESPOND_OPTIONS.map(option => {
          return (
            <BorderedRadio
              key={option.value}
              value={option.value}
              label={option.label}
            />
          )
        })}
      </RadioGroup>

      <Spacer y={2} />

      <Button
        variant="primaryBlack"
        width="100%"
        disabled={!selectedAction}
        onClick={() => {
          setRespondComplete()
        }}
      >
        Save and Review
      </Button>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2RespondForm_order on Order {
    itemsTotal {
      display
    }
    pendingOffer {
      amount {
        display
      }
    }
  }
`
