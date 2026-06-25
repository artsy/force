import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
import {
  BorderedRadio,
  Box,
  Button,
  Clickable,
  Flex,
  Input,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { Order2RespondOfferDetails } from "Apps/Order2/Routes/Respond/Components/Order2RespondOfferDetails"
import { useRespondToOffer } from "Apps/Order2/Routes/Respond/Mutations/useRespondToOffer"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import {
  type RespondAction,
  RespondStepName,
  RespondStepState,
} from "Apps/Order2/Routes/Respond/RespondContext/types"
import createLogger from "Utils/logger"
import type { Order2RespondForm_order$key } from "__generated__/Order2RespondForm_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2RespondForm.tsx")

interface Order2RespondFormProps {
  order: Order2RespondForm_order$key
}

const RESPOND_OPTIONS: Array<{ value: RespondAction; label: string }> = [
  { value: "APPROVE", label: "Accept gallery offer" },
  { value: "COUNTEROFFER", label: "Send counteroffer" },
  { value: "DECLINE", label: "Decline gallery offer" },
]

// Past-tense titles shown once the step is completed/collapsed.
const COMPLETED_TITLE: Record<RespondAction, string> = {
  APPROVE: "Accepted gallery offer",
  COUNTEROFFER: "Sent counteroffer",
  DECLINE: "Declined gallery offer",
}

export const Order2RespondForm: React.FC<Order2RespondFormProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const {
    selectedAction,
    setRespondAction,
    setRespondComplete,
    editRespond,
    steps,
  } = useRespondContext()
  const { respondToOffer } = useRespondToOffer()

  const [isOfferDetailsExpanded, setIsOfferDetailsExpanded] = useState(false)
  const [counterofferAmount, setCounterofferAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const isRespondCompleted =
    steps.find(step => step.name === RespondStepName.RESPOND)?.state ===
    RespondStepState.COMPLETED

  // Require a counteroffer amount before the request can be sent.
  const isCounterofferValid =
    selectedAction !== "COUNTEROFFER" || Number(counterofferAmount) > 0

  const handleSaveAndReview = async () => {
    const offerId = galleryOffer?.internalID

    if (!selectedAction || !isCounterofferValid || !offerId) {
      return
    }

    setIsSubmitting(true)

    try {
      // Backend is shared with the legacy flow, so this reuses the legacy
      // CommerceBuyer{Accept,Counter,Reject}Offer mutations.
      await respondToOffer({
        action: selectedAction,
        offerId,
        amountCents:
          selectedAction === "COUNTEROFFER"
            ? Number(counterofferAmount) * 100
            : undefined,
      })

      setRespondComplete()
    } catch (error) {
      // TODO: surface this to the user (toast/banner).
      logger.error("Failed to respond to offer", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // In the collapsed state show the resulting amount. For COUNTEROFFER the
  // total (incl. taxes & shipping) isn't computed yet — placeholder for now.
  // TODO: replace with the counteroffer's buyerTotal once it's available.
  const collapsedAmount =
    selectedAction === "COUNTEROFFER"
      ? "TODO: counteroffer total (incl. taxes & shipping)"
      : totalPrice

  if (isRespondCompleted) {
    return (
      <Flex
        flexDirection="column"
        backgroundColor="mono0"
        py={2}
        px={[2, 2, 4]}
      >
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Text variant={["sm", "md"]}>
            {selectedAction
              ? COMPLETED_TITLE[selectedAction]
              : "Response submitted"}
          </Text>
          <Clickable
            textDecoration="underline"
            cursor="pointer"
            type="button"
            aria-label="Edit response"
            onClick={() => {
              editRespond()
            }}
          >
            <Text variant="sm" fontWeight="normal" color="mono100">
              Edit
            </Text>
          </Clickable>
        </Flex>

        {collapsedAmount && (
          <>
            <Spacer y={1} />
            <Text variant={["sm", "md"]}>{collapsedAmount}</Text>
            <Text variant="xs" color="mono60">
              Including shipping and taxes
            </Text>
          </>
        )}
      </Flex>
    )
  }

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

      <Box
        overflow="hidden"
        maxHeight={isOfferDetailsExpanded ? "500px" : "0px"}
        style={{
          transition: "max-height 0.3s ease-out",
        }}
      >
        <Spacer y={2} />
        <Order2RespondOfferDetails order={orderData} />
      </Box>

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
        loading={isSubmitting}
        disabled={!selectedAction || !isCounterofferValid}
        onClick={handleSaveAndReview}
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
      internalID
      buyerTotal {
        display
      }
    }
    submittedOffers {
      internalID
      buyerTotal {
        display
      }
    }
    pendingOffer {
      internalID
      buyerTotal {
        display
      }
    }
    ...Order2RespondOfferDetails_order
  }
`
