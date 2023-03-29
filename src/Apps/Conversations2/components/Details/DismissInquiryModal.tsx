import {
  Button,
  Checkbox,
  Flex,
  ModalDialog,
  Select,
  Spacer,
  Text,
  TextArea,
  useToasts,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"
import {
  ActionType,
  ClickedDismissInquiry,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { graphql, useFragment } from "react-relay"
import { DismissInquiryModal_conversation$key } from "__generated__/DismissInquiryModal_conversation.graphql"
import { useRouter } from "System/Router/useRouter"
import { useDismissInquiry } from "Apps/Conversations2/mutations/useDismissInquiry"
import { useUpdateArtwork } from "Apps/Conversations2/mutations/useUpdateArtwork"

interface DismissInquiryModalProps {
  conversation: DismissInquiryModal_conversation$key
  onClose: () => void
}

interface DismissInquiryFormValues {
  sellerOutcome: string
  sellerOutcomeComment: string
  sellerOutcomeIsSold: boolean
}

export const DismissInquiryModal: React.FC<DismissInquiryModalProps> = ({
  conversation,
  onClose,
}) => {
  const { match, router } = useRouter()
  const { sendToast } = useToasts()
  const [isLoading, setIsLoading] = useState(false)
  const [commitDismissInquiry] = useDismissInquiry()
  const [commitUpdateArtwork] = useUpdateArtwork()
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()

  const data = useFragment(
    graphql`
      fragment DismissInquiryModal_conversation on Conversation {
        items {
          item {
            ... on Artwork {
              id
              internalID
              availability
            }
          }
        }
      }
    `,
    conversation
  )

  const artwork = data?.items?.[0]?.item

  const trackingData = {
    conversation_id: match.params.conversationId as string,
    context_module: "conversations",
    context_page_owner_type: OwnerType.conversation as PageOwnerType,
    artwork_id: artwork?.id ?? "",
    // FIXME
    // @ts-ignore
    partner_id: user?.currentPartner?._id ?? "",
  }

  const handleError = () => {
    setIsLoading(false)

    sendToast({
      variant: "error",
      message: "Error dismissing inquiry. Please try again.",
    })
  }

  const handleSuccess = (values: DismissInquiryFormValues) => {
    setIsLoading(false)

    sendToast({
      variant: "success",
      message: "Successfully dismissed inquiry.",
    })

    const trackingPayload: ClickedDismissInquiry = {
      action: ActionType.clickedDismissInquiry,
      label: "Dismiss inquiry",
      reason: values.sellerOutcome,
      ...trackingData,
    }
    trackEvent(trackingPayload)

    // TODO: This moves to the root, which will refetch conversation lists.
    // We will likely need to fine-tune this at some point.
    router.replace("/conversations")

    onClose()
  }

  const handleDismissInquiry = (values: DismissInquiryFormValues) => {
    setIsLoading(true)

    commitDismissInquiry({
      variables: {
        input: {
          conversationId: match.params.conversationId as string,
          dismissed: true,
          sellerOutcome: values.sellerOutcome,
          sellerOutcomeComment: values.sellerOutcomeComment,
        },
      },
      onError(error) {
        console.error("Error dismissing inquiry:", error)
        handleError()
      },
      onCompleted() {
        if (!values.sellerOutcomeIsSold) {
          return handleSuccess(values)
        }

        commitUpdateArtwork({
          variables: {
            input: {
              id: artwork?.internalID ?? "",
              availability: "sold",
            },
          },
          onError(error) {
            console.error("Error setting arwork as sold:", error)
            handleError()
          },
          onCompleted() {
            // TODO: Add tracking for changing availability here
            handleSuccess(values)
          },
        })
      },
    })
  }

  const handleCancelDismissInquiry = () => {
    const trackingPayload: ClickedDismissInquiry = {
      action: ActionType.clickedDismissInquiry,
      label: "Cancel dismiss inquiry",
      reason: "",
      ...trackingData,
    }
    trackEvent(trackingPayload)
    onClose()
  }

  return (
    <ModalDialog title="Dismiss inquiry" onClose={handleCancelDismissInquiry}>
      <Text variant="sm">
        This will not affect your response rate. You will still be able to see
        and reply to the conversation.
      </Text>

      <Spacer y={2} />

      <Formik<DismissInquiryFormValues>
        initialValues={{
          sellerOutcome: "",
          sellerOutcomeComment: "",
          sellerOutcomeIsSold: false,
        }}
        validationSchema={Yup.object({
          sellerOutcome: Yup.string().required("Reason required"),
          sellerOutcomeComment: Yup.string().max(1000, "Text too long"),
        })}
        onSubmit={handleDismissInquiry}
        isInitialValid={false}
      >
        {({ errors, values, setFieldValue, isValid }) => (
          <Form>
            <Select
              description="Why are you dismissing this inquiry?"
              onSelect={value => setFieldValue("sellerOutcome", value)}
              error={errors.sellerOutcome}
              options={[
                {
                  text: "Select a reason to dismiss this inquiry",
                  value: "",
                },
                {
                  text: "The work is no longer available",
                  value: "work_unavailable",
                },
                {
                  text: "I already contacted this person",
                  value: "already_contacted",
                },
                {
                  text: "Other",
                  value: "other",
                },
              ]}
            />

            <Spacer y={2} />

            {artwork?.availability !== "sold" &&
              values.sellerOutcome === "work_unavailable" && (
                <Checkbox
                  selected={values.sellerOutcomeIsSold}
                  onSelect={value => {
                    setFieldValue("sellerOutcomeIsSold", value)
                  }}
                >
                  {'Set this work as "Sold".'}
                </Checkbox>
              )}

            {values.sellerOutcome === "other" && (
              <TextArea
                title="Help us improve the experience by explaining your reason."
                description="This message will not be shared with the collector."
                value={values.sellerOutcomeComment}
                onChange={({ value }) =>
                  setFieldValue("sellerOutcomeComment", value)
                }
                characterLimit={1000}
              />
            )}

            <Spacer y={4} />

            <Flex justifyContent="space-between">
              <Button
                variant="secondaryBlack"
                width="50%"
                mr={1}
                onClick={handleCancelDismissInquiry}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primaryBlack"
                width="50%"
                loading={isLoading}
                disabled={!isValid}
              >
                Dismiss Inquiry
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </ModalDialog>
  )
}
