import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
import {
  Box,
  Button,
  Clickable,
  Flex,
  Input,
  Message,
  Radio,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { Order2RespondOfferDetails } from "Apps/Order2/Routes/Respond/Components/Order2RespondOfferDetails"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import {
  type RespondAction,
  RespondStepName,
  RespondStepState,
} from "Apps/Order2/Routes/Respond/RespondContext/types"
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

  const [isOfferDetailsExpanded, setIsOfferDetailsExpanded] = useState(false)
  const [counterofferAmount, setCounterofferAmount] = useState("")

  const galleryOffer = orderData.lastSubmittedOffer

  // Total the buyer would pay — items + shipping + taxes combined.
  const totalPrice = galleryOffer?.buyerTotal?.display

  const isRespondCompleted =
    steps.find(step => step.name === RespondStepName.RESPOND)?.state ===
    RespondStepState.COMPLETED

  // Require a counteroffer amount before continuing.
  const isCounterofferValid =
    selectedAction !== "COUNTEROFFER" || Number(counterofferAmount) > 0

  const handleSaveAndReview = () => {
    if (!selectedAction || !isCounterofferValid) {
      return
    }
    // NOTE: actually submitting the response (accept/counteroffer/decline) is
    // out of scope for this ticket — it's handled in EMI-3288
    // (https://artsyproduct.atlassian.net/browse/EMI-3288). Here we only
    // advance/collapse the step.
    setRespondComplete()
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

        <Spacer y={1} />
        <Message variant="default" p={1}>
          <Text variant="xs">
            No request was sent — submitting the response will be implemented in
            EMI-3288.
          </Text>
        </Message>
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
        gap={1}
      >
        {RESPOND_OPTIONS.map(option => {
          return (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              backgroundColor={
                selectedAction === option.value ? "mono5" : undefined
              }
              p={1}
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
                        // Keep digits only.
                        setCounterofferAmount(
                          event.currentTarget.value.replace(/[^\d]/g, ""),
                        )
                      }}
                    />
                  </>
                )}
              {option.value === "DECLINE" && selectedAction === "DECLINE" && (
                <>
                  <Spacer y={1} />
                  <Text variant="xs">
                    Declining this offer ends this negotiation.
                  </Text>
                </>
              )}
            </Radio>
          )
        })}
      </RadioGroup>

      <Spacer y={2} />

      <Button
        variant="primaryBlack"
        width="100%"
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
    lastSubmittedOffer {
      buyerTotal {
        display
      }
    }
    ...Order2RespondOfferDetails_order
  }
`
