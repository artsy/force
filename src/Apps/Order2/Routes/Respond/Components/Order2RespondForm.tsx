import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
import {
  Box,
  Button,
  Clickable,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
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
  COUNTEROFFER: "Your counteroffer",
  DECLINE: "Decline gallery offer",
}

const DECLINE_WARNING = "Declining this offer ends this negotiation."

// The detail shown below the title in the collapsed/completed state: a primary
// line plus an optional grey note.
interface CompletedCaption {
  detail?: string
  note?: string
}

const getCompletedCaption = (
  action: RespondAction,
  totalPrice: string | null | undefined,
  counterofferAmount: string,
): CompletedCaption => {
  if (action === "DECLINE") {
    return { detail: DECLINE_WARNING }
  }

  if (action === "COUNTEROFFER") {
    return {
      detail: `$${counterofferAmount}`,
      note: "Excluding shipping and taxes",
    }
  }

  // APPROVE
  if (!totalPrice) {
    return {}
  }

  return { detail: totalPrice, note: "Including shipping and taxes" }
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

  // Total the buyer would pay — items + shipping + taxes combined.
  const totalPrice = orderData.lastSubmittedOffer?.buyerTotal?.display

  const isRespondCompleted =
    steps.find(step => step.name === RespondStepName.RESPOND)?.state ===
    RespondStepState.COMPLETED

  // Require a counteroffer amount before continuing.
  const isCounterofferValid =
    selectedAction !== "COUNTEROFFER" || Number(counterofferAmount) > 0

  const handleContinueToReview = () => {
    if (!selectedAction || !isCounterofferValid) {
      return
    }
    // Advancing to the review step is navigation-only — no mutation runs here.
    // The response is submitted from the summary’s Submit CTA (EMI-3288).
    setRespondComplete()
  }

  if (isRespondCompleted && selectedAction) {
    return (
      <RespondCompletedView
        action={selectedAction}
        totalPrice={totalPrice}
        counterofferAmount={counterofferAmount}
        onEdit={editRespond}
      />
    )
  }

  return (
    <RespondCard>
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
              <Text variant="xs">including shipping &amp; taxes</Text>
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
                  <Text variant="xs">{DECLINE_WARNING}</Text>
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
        onClick={handleContinueToReview}
      >
        Continue to Review
      </Button>
    </RespondCard>
  )
}

interface RespondCompletedViewProps {
  action: RespondAction
  totalPrice?: string | null
  counterofferAmount: string
  onEdit: () => void
}

const RespondCompletedView: React.FC<RespondCompletedViewProps> = ({
  action,
  totalPrice,
  counterofferAmount,
  onEdit,
}) => {
  const caption = getCompletedCaption(action, totalPrice, counterofferAmount)

  return (
    <RespondCard>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <SectionHeading>{COMPLETED_TITLE[action]}</SectionHeading>
        </Flex>

        <Clickable
          textDecoration="underline"
          cursor="pointer"
          type="button"
          aria-label="Edit response"
          onClick={onEdit}
        >
          {/*TODO: maybe refactor to reuse across order/ofer */}
          <Text variant="xs" fontWeight="normal" color="mono100">
            Edit
          </Text>
        </Clickable>
      </Flex>

      {(caption.detail || caption.note) && (
        <Box ml="30px" mt={1}>
          {caption.detail && <Text variant="sm-display">{caption.detail}</Text>}
          {caption.note && (
            <Text variant="sm-display" color="mono60">
              {caption.note}
            </Text>
          )}
        </Box>
      )}
    </RespondCard>
  )
}

// Shared padded white card wrapping both the editable and completed states.
const RespondCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      {children}
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
