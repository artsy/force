import { ContextModule } from "@artsy/cohesion"
import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
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
import { ErrorBanner } from "Apps/Order2/Components/ErrorBanner"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { Order2RespondOfferDetails } from "Apps/Order2/Routes/Respond/Components/Order2RespondOfferDetails"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import { useOrder2CreateCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2CreateCounterOfferMutation"
import {
  type RespondAction,
  RespondStepName,
  RespondStepState,
} from "Apps/Order2/Routes/Respond/RespondContext/types"
import { hasCurrentCounterofferDraft } from "Apps/Order2/Routes/Respond/Utils/counterofferDraft"
import createLogger from "Utils/logger"
import type { Order2RespondForm_order$key } from "__generated__/Order2RespondForm_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2RespondForm")

const GENERIC_ERROR = "Something went wrong. Please try again."

interface Order2RespondFormProps {
  order: Order2RespondForm_order$key
}

const RESPOND_OPTIONS: Array<{ value: RespondAction; label: string }> = [
  { value: "APPROVE", label: "Accept gallery offer" },
  { value: "COUNTEROFFER", label: "Send counteroffer" },
  { value: "DECLINE", label: "Decline gallery offer" },
]

const TRACKING_OPTION_BY_ACTION: Record<
  RespondAction,
  "accept" | "counter" | "decline"
> = {
  APPROVE: "accept",
  COUNTEROFFER: "counter",
  DECLINE: "decline",
}

const DECLINE_WARNING = "Declining this offer ends this negotiation."

const RESPONSE_REQUIRED_TITLE = "Response required"
const RESPONSE_REQUIRED_MESSAGE =
  "Please accept, counter, or decline the gallery’s offer to continue."

interface CompletedResponse {
  title: string
  detail?: string
  note?: string
}

interface GetCompletedResponseParams {
  action: RespondAction
  totalPrice?: string | null
  counterofferAmount: string
}

const getCompletedResponse = ({
  action,
  totalPrice,
  counterofferAmount,
}: GetCompletedResponseParams): CompletedResponse => {
  if (action === "DECLINE") {
    return { title: "Decline gallery offer", detail: DECLINE_WARNING }
  }

  if (action === "COUNTEROFFER") {
    return {
      title: "Your counteroffer",
      detail: `$${counterofferAmount}`,
      note: "Excluding shipping and taxes",
    }
  }

  return {
    title: "Accepted gallery offer",
    ...(totalPrice && {
      detail: totalPrice,
      note: "Including shipping and taxes",
    }),
  }
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
    checkoutTracking,
  } = useRespondContext()

  const [isOfferDetailsExpanded, setIsOfferDetailsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasValidationError, setHasValidationError] = useState(false)

  // Pre-fill the input from the buyer’s draft counteroffer (e.g. after a
  // refresh) so they can edit it rather than start from a blank field. Only use
  // a draft that belongs to the current round — a pending offer from an earlier
  // round (buyer countered, gallery countered back) is stale and must be
  // ignored.
  const draftCounterofferAmount = hasCurrentCounterofferDraft({
    pendingOffer: orderData.pendingOffer,
    galleryOffer: orderData.lastSubmittedOffer,
  })
    ? orderData.pendingOffer?.amount?.major
    : null
  const [counterofferAmount, setCounterofferAmount] = useState(
    draftCounterofferAmount ? String(draftCounterofferAmount) : "",
  )

  const { submitMutation: createCounterOffer } =
    useOrder2CreateCounterOfferMutation()

  // Total the buyer would pay — items + shipping + taxes combined.
  const totalPrice = orderData.lastSubmittedOffer?.buyerTotal?.display

  const isRespondCompleted =
    steps.find(step => step.name === RespondStepName.RESPOND)?.state ===
    RespondStepState.COMPLETED

  // Require a counteroffer amount before continuing.
  const isCounterofferValid =
    selectedAction !== "COUNTEROFFER" || Number(counterofferAmount) > 0

  const handleSelectAction = (value: string) => {
    const action = value as RespondAction
    setHasValidationError(false)
    setRespondAction(action)

    const amount = orderData.lastSubmittedOffer?.amount?.major
    const currency = orderData.lastSubmittedOffer?.amount?.currencyCode

    // Amount/currency describe the gallery offer being acted on and
    // only apply to accept/counter — decline carries no amount.
    const isDecline = action === "DECLINE"
    checkoutTracking.clickedCounterOfferOption({
      option: TRACKING_OPTION_BY_ACTION[action],
      amount: isDecline ? undefined : amount,
      currency: isDecline ? undefined : currency,
    })
  }

  const handleContinueToReview = async () => {
    if (!selectedAction || !isCounterofferValid) {
      setHasValidationError(true)
      return
    }

    checkoutTracking.clickedOrderProgression(ContextModule.ordersCounter)
    setHasValidationError(false)

    // No response is submitted here — every response is submitted from the
    // summary’s Submit CTA. Accept/decline just advance to that step.
    if (selectedAction !== "COUNTEROFFER") {
      setRespondComplete()
      return
    }

    // A counteroffer creates a pending buyer offer (responding to
    // the gallery’s offer) before advancing to the summary’s Submit CTA.
    const respondsToID = orderData.lastSubmittedOffer?.internalID
    if (!respondsToID) {
      return
    }

    try {
      setErrorMessage(null)
      setIsSubmitting(true)

      const response = await createCounterOffer({
        variables: {
          input: {
            orderID: orderData.internalID,
            amountMinor: Number(counterofferAmount) * 100,
            respondsToID,
          },
        },
      })

      const offerOrError = response.createBuyerOffer?.offerOrError

      if (offerOrError && "mutationError" in offerOrError) {
        // TODO: proper error handling is tracked in EMI-3175.
        setErrorMessage(offerOrError.mutationError?.message ?? GENERIC_ERROR)
        return
      }

      setRespondComplete()
    } catch (error) {
      // TODO: proper error handling is tracked in EMI-3175.
      logger.error(error)
      setErrorMessage(GENERIC_ERROR)
    } finally {
      setIsSubmitting(false)
    }
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
      <Text variant={["sm", "md"]} fontWeight="bold">Respond to gallery offer</Text>

      {totalPrice && (
        <>
          <Spacer y={1} />
          <Flex alignItems="flex-end" gap={1}>
            <Text variant={["md", "lg-display"]}>{totalPrice}</Text>
            <Clickable
              display="flex"
              alignItems="center"
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

      {hasValidationError && (
        <>
          <ErrorBanner title={RESPONSE_REQUIRED_TITLE}>
            {RESPONSE_REQUIRED_MESSAGE}
          </ErrorBanner>
          <Spacer y={2} />
        </>
      )}

      <RadioGroup
        onSelect={handleSelectAction}
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
                        setHasValidationError(false)
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

      {errorMessage && (
        <>
          <Spacer y={2} />
          <Message variant="error" p={1}>
            <Text variant="xs">{errorMessage}</Text>
          </Message>
        </>
      )}

      <Spacer y={2} />

      <Button
        variant="primaryBlack"
        width="100%"
        loading={isSubmitting}
        onClick={handleContinueToReview}
      >
        Continue to Review
      </Button>
    </RespondCard>
  )
}

interface RespondCompletedViewProps extends GetCompletedResponseParams {
  onEdit: () => void
}

const RespondCompletedView: React.FC<RespondCompletedViewProps> = ({
  action,
  totalPrice,
  counterofferAmount,
  onEdit,
}) => {
  const { title, detail, note } = getCompletedResponse({
    action,
    totalPrice,
    counterofferAmount,
  })

  return (
    <RespondCard>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <SectionHeading>{title}</SectionHeading>
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

      {(detail || note) && (
        <Box ml="30px" mt={1}>
          {detail && <Text variant="sm-display">{detail}</Text>}
          {note && (
            <Text variant="sm-display" color="mono60">
              {note}
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
    internalID
    lastSubmittedOffer {
      internalID
      createdAt
      amount {
        major
        currencyCode
      }
      buyerTotal {
        display
      }
    }
    pendingOffer {
      createdAt
      amount {
        major
      }
    }
    ...Order2RespondOfferDetails_order
  }
`
