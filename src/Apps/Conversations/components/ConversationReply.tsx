/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState, FC, useRef } from "react"
import { useFormik, FormikHelpers } from "formik"
import * as Yup from "yup"
import { Button, Flex, TextArea, useToasts } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { sentConversationMessage } from "@artsy/cohesion"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { useSendConversationMessage } from "Apps/Conversations/mutations/useSendConversationMessage"
import { useSendConversationMessageMutation$data } from "__generated__/useSendConversationMessageMutation.graphql"
import { ConversationReply_conversation$key } from "__generated__/ConversationReply_conversation.graphql"
import { ConversationCTA } from "Apps/Conversations/components/ConversationCTA/ConversationCTA"

interface ConversationReplyProps {
  conversation: ConversationReply_conversation$key
}

interface ConversationReplyFormValues {
  message: string
}

const TEXT_AREA_MIN_HEIGHT = "50px"

export const ConversationReply: FC<ConversationReplyProps> = ({
  conversation,
}) => {
  const { user } = useSystemContext()
  const { match } = useRouter()
  const { trackEvent } = useTracking()
  const { sendToast } = useToasts()
  const [isLoading, setIsLoading] = useState(false)
  const [commit, isSendingMutation] = useSendConversationMessage()
  const [textAreaHeight, setTextAreaHeight] = useState(TEXT_AREA_MIN_HEIGHT)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const data = useFragment(
    graphql`
      fragment ConversationReply_conversation on Conversation {
        ...ConversationCTA_conversation

        from @required(action: NONE) {
          email @required(action: NONE)
          id @required(action: NONE)
        }
        internalID @required(action: NONE)
        inquiryID @required(action: NONE)
        items {
          item {
            ... on Artwork {
              id
            }
          }
        }
        # TODO: the suggested field is returning empty edges, we need to take a look
        # Suggested: The field Conversation.lastMessageID is deprecated.
        # Deprecation reason: "Prefer querying messagesConnection(last:1) { edges { node { internalID } } }
        lastMessageID
      }
    `,
    conversation
  )

  const handleError = (error?: unknown) => {
    console.error("Error sending message:", error)

    sendToast({
      variant: "error",
      message: "Error sending message. Please try again.",
    })

    setIsLoading(false)
  }

  const handleReply = (
    values: ConversationReplyFormValues,
    helpers: FormikHelpers<ConversationReplyFormValues>
  ) => {
    if (!data || !user) {
      sendToast({
        variant: "alert",
        message: "Wait for the attachments to be fully loaded.",
      })
      return
    }

    setIsLoading(true)

    commit({
      variables: {
        input: {
          from: user.email as string,
          fromId: user.id,
          bodyText: values.message,
          id: data.internalID,
          replyToMessageID: data.lastMessageID ?? "",
        },
      },
      onCompleted(response: useSendConversationMessageMutation$data, errors) {
        if (errors) {
          handleError(errors)
          return
        }

        helpers.resetForm()

        trackEvent(
          sentConversationMessage({
            impulseConversationId: match.params.conversationId as string,
            impulseMessageId:
              response.sendConversationMessage?.conversation?.lastMessageID ??
              "",
          })
        )

        setIsLoading(false)
        setTextAreaHeight(TEXT_AREA_MIN_HEIGHT)
      },
      onError: handleError,
    })
  }

  const { values, setFieldValue, isValid, resetForm, handleSubmit } = useFormik(
    {
      initialValues: {
        message: "",
      },
      validationSchema: Yup.object({
        message: Yup.string().required(),
      }),
      onSubmit: handleReply,
      isInitialValid: false,
    }
  )

  useEffect(() => {
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.internalID, resetForm])

  // Listen for Command+Enter keypress
  useEffect(() => {
    const inputArea = textAreaRef?.current

    const handleKeyDown = event => {
      if (event.key === "Enter" && event.metaKey) {
        if (!isSendingMutation) {
          handleSubmit(event)
        }
      }
    }

    inputArea?.addEventListener("keydown", handleKeyDown)

    return () => {
      inputArea?.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleSubmit, isSendingMutation])

  if (!data || !user) {
    return null
  }

  return (
    <Flex
      borderTop="1px solid"
      borderTopColor="black15"
      backgroundColor="black5"
      flexDirection="column"
    >
      <ConversationCTA conversation={data} px={1} pt={1} />

      <form name="reply" onSubmit={handleSubmit}>
        <Flex alignItems="flex-end" position="relative">
          <TextArea
            ref={textAreaRef}
            my={1}
            mx={1}
            style={{
              borderRadius: "10px",
              minHeight: "50px",
              maxHeight: "40vh",
              height: textAreaHeight,
              borderColor: "white100",
              paddingRight: "100px",
              resize: "none",
            }}
            value={values.message}
            placeholder="Type your message"
            onInput={event => {
              const field = event.target as HTMLTextAreaElement
              // Set original height each time so scrollHeight is also
              // calculated when the content shrinks.
              field.style.height = TEXT_AREA_MIN_HEIGHT
              setTextAreaHeight(field.scrollHeight + "px")
              field.style.height = textAreaHeight
            }}
            onChange={({ value }) => setFieldValue("message", value)}
          />
          <Button
            variant="primaryBlack"
            size="small"
            type="submit"
            disabled={!isValid}
            loading={isLoading}
            position="absolute"
            right={2}
            bottom={2}
          >
            Send
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export const formatSize = (size: number): string => {
  const mb = size / 1_000_000
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(size / 1000)} KB`
}
