import { useToasts } from "@artsy/palette"
import type { ArtAssistantImage } from "Apps/ArtAssistant/types"
import { createImageThumbnail } from "Apps/ArtAssistant/utils/createImageThumbnail"
import { uploadImageToS3 } from "Components/Search/ImageSearch/uploadImageToS3"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useCallback, useEffect, useRef, useState } from "react"

export type ArtAssistantImageAttachment =
  | { status: "uploading"; previewURL: string }
  | { status: "ready"; previewURL: string; image: ArtAssistantImage }

export const useArtAssistantImageAttachment = () => {
  const { relayEnvironment } = useSystemContext()
  const { sendToast } = useToasts()
  const [attachment, setAttachment] =
    useState<ArtAssistantImageAttachment | null>(null)
  const attempt = useRef(0)
  const previewURL = useRef<string | null>(null)

  const clear = useCallback(() => {
    attempt.current += 1
    if (previewURL.current) URL.revokeObjectURL(previewURL.current)
    previewURL.current = null
    setAttachment(null)
  }, [])

  useEffect(() => clear, [clear])

  const attach = useCallback(
    async (file: File): Promise<void> => {
      clear()
      if (!relayEnvironment) return
      const currentAttempt = attempt.current
      const url = URL.createObjectURL(file)
      previewURL.current = url
      setAttachment({ status: "uploading", previewURL: url })
      try {
        const [asset, thumbnailURL] = await Promise.all([
          uploadImageToS3(relayEnvironment, file),
          createImageThumbnail(file),
        ])
        if (currentAttempt !== attempt.current) return
        if (!asset) throw new Error("Upload returned no asset")
        setAttachment({
          status: "ready",
          previewURL: url,
          image: { ...asset, ...(thumbnailURL ? { thumbnailURL } : {}) },
        })
      } catch (error) {
        if (currentAttempt !== attempt.current) return
        console.error("Art Assistant: failed to upload image", error)
        clear()
        sendToast({
          message: "Something went wrong. Please try another image.",
          variant: "error",
        })
      }
    },
    [clear, relayEnvironment, sendToast],
  )

  return { attachment, attach, remove: clear }
}
