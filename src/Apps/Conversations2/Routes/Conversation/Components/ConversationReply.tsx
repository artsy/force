import { useEffect, useState, FC, useRef } from "react"
import { useFormik, FormikHelpers } from "formik"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"
import {
  Button,
  Flex,
  Spacer,
  TextArea,
  useToasts,
  Input,
} from "@artsy/palette"
import PaperClipIcon from "@artsy/icons/PaperClipIcon"
import { useSendConversationMessage } from "pages/conversations/mutations/useSendConversationMessage"
import { graphql, useFragment } from "react-relay"
import { ConversationReply_conversation$key } from "__generated__/ConversationReply_conversation.graphql"
import { useSystemContext } from "system/SystemContext"
import { ConversationAttachmentsList } from "pages/conversations/[conversationId]/Components/ConversationAttachmentsList"
import { useTracking } from "react-tracking"
import { sentConversationMessage } from "@artsy/cohesion"
import { useRouter } from "next/router"
import { useSendConversationMessageMutation$data } from "__generated__/useSendConversationMessageMutation.graphql"
import { ConversationMessageAttachmentInput } from "__generated__/useSendConversationMessageMutation.graphql"
import { useAttachments } from "pages/conversations/hooks/useAttachments"

interface ConversationReplyProps {
  conversation: ConversationReply_conversation$key
}

interface ConversationReplyFormValues {
  message: string
}

const TEXT_AREA_MIN_HEIGHT = "50px"

export const formatSize = (size: number): string => {
  const mb = size / 1_000_000
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(size / 1000)} KB`
}

export const ConversationReply: FC<ConversationReplyProps> = ({
  conversation,
}) => {
  const { user } = useSystemContext()
  const { query } = useRouter()
  const { trackEvent } = useTracking()
  const { sendToast } = useToasts()
  const [isLoading, setIsLoading] = useState(false)
  const [commit] = useSendConversationMessage()
  const [textAreaHeight, setTextAreaHeight] = useState(TEXT_AREA_MIN_HEIGHT)
  const inputRef = useRef<HTMLInputElement>(null)

  const data = useFragment(
    graphql`
      fragment ConversationReply_conversation on Conversation {
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

  const {
    attachments,
    isLoadingAttachments,
    error,
    addAttachments,
    removeAttachment,
    clearAttachments,
    clearError,
  } = useAttachments(data?.inquiryID)

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
    if (!data || !user || isLoadingAttachments) {
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
          from: user.email,
          fromId: user.id,
          bodyText: values.message,
          id: data.internalID,
          replyToMessageID: data.lastMessageID ?? "",
          attachments: attachments.map(
            ({ numericSize: _, id: __, file: ___, ...rest }) =>
              rest as ConversationMessageAttachmentInput
          ),
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
            impulseConversationId: query.conversationId as string,
            impulseMessageId:
              response.sendConversationMessage?.conversation?.lastMessageID ??
              "",
          })
        )
        setIsLoading(false)
        clearAttachments()
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
    clearAttachments()
  }, [data?.internalID, resetForm, clearAttachments])

  useEffect(() => {
    if (error === "size") {
      sendToast({
        variant: "error",
        message:
          "Unable to attach document (exceeds message size limit of 20MB)",
        ttl: 6000,
      })
      clearError()
    }
  }, [error, clearError, sendToast])

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
      <ConversationAttachmentsList
        attachments={attachments}
        onRemoveAttachment={removeAttachment}
      />
      <form name="reply" onSubmit={handleSubmit}>
        <Flex alignItems="flex-end" position="relative">
          <label
            htmlFor="attachmentsFileInput"
            style={{ cursor: "pointer" }}
            onClick={() =>
              trackEvent({
                action: "Click",
                label: "Attach",
                context_module: "conversations",
                artwork_id: data.items?.[0]?.item?.id,
              })
            }
            data-testid="attach-button"
          >
            <Flex size={50} alignItems="center" justifyContent="center">
              <PaperClipIcon color="black100" size={16} />
            </Flex>
            <Spacer y={1} />
          </label>
          <Input
            type="file"
            hidden
            display="none"
            multiple
            accept="image/*, .pdf"
            id="attachmentsFileInput"
            ref={inputRef}
            onChange={({ target }) => {
              if (!target.files?.length) return
              const files = Array.from(target.files).map((file) => ({
                name: file.name,
                type: file.type,
                size: formatSize(file.size),
                numericSize: file.size,
                id: uuidv4(),
                file,
              }))
              addAttachments(files)
              if (inputRef.current) {
                inputRef.current.value = ""
              }
            }}
            data-testid="attachments-input"
          />

          <TextArea
            my={1}
            mr={1}
            style={{
              borderRadius: "10px",
              minHeight: "50px",
              maxHeight: "40vh",
              height: textAreaHeight,
              borderColor: "white",
              paddingRight: "100px",
              resize: "none",
            }}
            value={values.message}
            placeholder="Type your message"
            onInput={(event) => {
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
