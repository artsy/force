import { useToasts } from "@artsy/palette"
import { useCallback, useEffect, useRef, useState } from "react"
import { uploadFileToS3 } from "utils/hooks/uploadFileToS3"
import { ConversationMessageAttachmentInput } from "__generated__/useSendConversationMessageMutation.graphql"

const MAX_ATTACHMENTS_SIZE = 20_000_000

export type Attachment = Omit<ConversationMessageAttachmentInput, "url"> & {
  id: string
  url?: ConversationMessageAttachmentInput["url"]
  numericSize?: number
  file: File
}

export type AttachmentsMap = Record<string, Attachment>

// Manage a list of attachments
// uploading the files to S3 as soon as they are correctly loaded
export const useAttachments = (inquiryId?: string) => {
  const [attachmentsHash, setAttachmentsHash] = useState<AttachmentsMap>({})
  const { sendToast } = useToasts()
  const attachmentsLoadingRef = useRef<string[]>([])
  const [error, setError] = useState<"size" | null>(null)
  const attachments = Object.values(attachmentsHash)

  const attachmentsSize = attachments.reduce((sum, attachment) => {
    return sum + (attachment.numericSize ?? 0)
  }, 0)
  const isLoadingAttachments = attachments.some((attachment) => !attachment.url)

  const clearAttachments = useCallback(() => {
    setAttachmentsHash({})
    attachmentsLoadingRef.current = []
  }, [])

  const clearError = () => setError(null)

  const updateAttachmentURL = useCallback((id: string, url: string) => {
    setAttachmentsHash((attachmentsHash) => {
      if (!attachmentsHash[id] || !!attachmentsHash[id].url) {
        return attachmentsHash
      }

      const { [id]: attachment, ...rest } = attachmentsHash
      return {
        ...rest,
        [id]: {
          ...attachment,
          url,
        },
      }
    })
  }, [])

  const addAttachments = useCallback((attachments: Attachment[]) => {
    setAttachmentsHash((attachmentsHash) => {
      const newHash: AttachmentsMap = {}
      attachments.forEach((attachment) => {
        newHash[attachment.id] = attachment
      })

      return { ...attachmentsHash, ...newHash }
    })
  }, [])

  const removeAttachment = useCallback((id: string) => {
    setAttachmentsHash((attachmentsHash) => {
      const { [id]: _, ...rest } = attachmentsHash
      const loadingAttachments = attachmentsLoadingRef.current
      loadingAttachments.splice(loadingAttachments.indexOf(id), 1)
      attachmentsLoadingRef.current = loadingAttachments
      return rest
    })
  }, [])

  const removeAttachmentsWithoutUrl = useCallback(() => {
    setAttachmentsHash((attachmentsHash) => {
      const filteredAttachmentsHash: AttachmentsMap = {}
      const filteredAttachmentsIds: string[] = []
      Object.values(attachmentsHash).forEach((attachment) => {
        if (attachmentsHash[attachment.id]?.url) {
          filteredAttachmentsHash[attachment.id] = attachment
          filteredAttachmentsIds.push(attachment.id)
        }
      })
      attachmentsLoadingRef.current = filteredAttachmentsIds
      return filteredAttachmentsHash
    })
  }, [])

  const uploadFiles = useCallback(() => {
    Object.keys(attachmentsHash).map((key) => {
      if (
        attachmentsHash[key]?.url ||
        attachmentsLoadingRef.current.includes(key) ||
        !inquiryId
      ) {
        return
      }

      attachmentsLoadingRef.current.push(key)

      const { id, name, file } = attachmentsHash[key]
      uploadFileToS3({
        file,
        key: `messages/${inquiryId}/${id}/${name}`,
      })
        .then((url) => updateAttachmentURL(key, url))
        .catch((error) => {
          sendToast({
            variant: "error",
            message: "Attachment failed to upload. Please try again.",
          })
          console.error("Error during attachment upload", error)
        })
    })
  }, [updateAttachmentURL, attachmentsHash, inquiryId, sendToast])

  useEffect(() => {
    if (attachmentsSize === 0) {
      return
    }
    if (attachmentsSize > MAX_ATTACHMENTS_SIZE) {
      setError("size")
      removeAttachmentsWithoutUrl()
      return
    }

    uploadFiles()
  }, [
    attachmentsSize,
    removeAttachmentsWithoutUrl,
    attachments.length,
    uploadFiles,
  ])

  return {
    attachments,
    isLoadingAttachments,
    error,
    addAttachments,
    removeAttachment,
    clearAttachments,
    clearError,
  }
}
