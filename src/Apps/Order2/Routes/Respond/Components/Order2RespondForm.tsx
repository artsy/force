import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
import {
  BorderedRadio,
  Button,
  Clickable,
  Flex,
  Input,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { Order2RespondOfferDetails } from "Apps/Order2/Routes/Respond/Components/Order2RespondOfferDetails"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import type { RespondAction } from "Apps/Order2/Routes/Respond/RespondContext/types"
import type { Order2RespondForm_order$key } from "__generated__/Order2RespondForm_order.graphql"
import { useState } from "react"
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

  const [isOfferDetailsExpanded, setIsOfferDetailsExpanded] = useState(false)
  const [counterofferAmount, setCounterofferAmount] = useState("")

  // Gallery's offer being responded to. Depending on negotiation state the
  // exchange API may expose it on any of these, so fall back through them
  // (legacy `order.lastOffer` ≈ `lastSubmittedOffer`).
  const submittedOffers = orderData.submittedOffers ?? []
  const galleryOffer =
    orderData.lastSubmittedOffer ??
    submittedOffers[submittedOffers.length - 1] ??
    orderData.pendingOffer
  // Total the buyer would pay — items + shipping + taxes combined. Legacy:
  // `TransactionDetailsSummaryItem` Total row uses `offer.buyerTotal`.
  const totalPrice =
    galleryOffer?.buyerTotal?.display ?? orderData.buyerTotal?.display

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Text variant={["sm", "md"]}>Respond to gallery offer</Text>

      {totalPrice && (
        <>
          <Spacer y={1} />
          <Flex alignItems="flex-end" gap={1}>
            <Text variant={["md", "lg-display"]}>{totalPrice}</Text>
            <Clickable
              display="flex"
              alignItems="center"
              color="mono60"
              onClick={() => {
                setIsOfferDetailsExpanded(!isOfferDetailsExpanded)
              }}
              aria-expanded={isOfferDetailsExpanded}
              aria-label="Toggle offer details"
            >
              <Text variant="xs" color="mono60">
                including shipping &amp; taxes
              </Text>
              <Spacer x={0.5} />
              <ChevronUpIcon
                height="18px"
                style={{
                  transition: "transform 0.3s ease-in-out",
                  transform: isOfferDetailsExpanded
                    ? "scaleY(-1)"
                    : "scaleY(1)",
                }}
              />
            </Clickable>
          </Flex>
        </>
      )}

      {isOfferDetailsExpanded && (
        <>
          <Spacer y={2} />
          <Order2RespondOfferDetails order={orderData} />
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
            >
              {option.value === "COUNTEROFFER" &&
                selectedAction === "COUNTEROFFER" && (
                  <>
                    <Spacer y={1} />
                    <Input
                      title="Your offer ($)"
                      placeholder="Enter amount excluding shipping & tax"
                      inputMode="numeric"
                      value={counterofferAmount}
                      onChange={event => {
                        // Keep digits only, mirroring the legacy OfferInput.
                        setCounterofferAmount(
                          event.currentTarget.value.replace(/[^\d]/g, ""),
                        )
                      }}
                    />
                  </>
                )}
            </BorderedRadio>
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
    buyerTotal {
      display
    }
    lastSubmittedOffer {
      buyerTotal {
        display
      }
    }
    submittedOffers {
      buyerTotal {
        display
      }
    }
    pendingOffer {
      buyerTotal {
        display
      }
    }
    ...Order2RespondOfferDetails_order
  }
`
