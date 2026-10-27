import CameraStrokeIcon from "@artsy/icons/CameraStrokeIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, Button, Clickable, Flex, TextArea } from "@artsy/palette"
import type { ArtAssistantImageAttachment } from "Apps/ArtAssistant/hooks/useArtAssistantImageAttachment"
import type { ArtAssistantImage } from "Apps/ArtAssistant/types"
import { ImageSearchThumbnail } from "Components/Search/ImageSearch/ImageSearchThumbnail"
import { useEffect, useRef, type FC, type RefObject } from "react"
import styled from "styled-components"

interface ArtAssistantComposerProps {
  value: string
  isResponding: boolean
  onChange: (value: string) => void
  onSubmit: (submission: { text: string; image?: ArtAssistantImage }) => boolean
  inputRef?: RefObject<HTMLTextAreaElement>
  attachment?: ArtAssistantImageAttachment | null
  onAddImage?: () => void
  onRemoveImage?: () => void
}

export const ArtAssistantComposer: FC<ArtAssistantComposerProps> = ({
  value,
  isResponding,
  onChange,
  onSubmit,
  inputRef,
  attachment,
  onAddImage,
  onRemoveImage,
}) => {
  const fallbackRef = useRef<HTMLTextAreaElement | null>(null)
  const input = inputRef ?? fallbackRef
  // biome-ignore lint/correctness/useExhaustiveDependencies: Re-measure the text after typing or clearing the draft.
  useEffect(() => {
    const element = input.current
    if (!element) return
    element.style.height = "auto"
    element.style.height = `${Math.max(44, Math.min(element.scrollHeight, 120))}px`
  }, [value])
  const isUploading = attachment?.status === "uploading"
  const image = attachment?.status === "ready" ? attachment.image : undefined
  const isDisabled = isResponding || isUploading || (!value.trim() && !image)
  const handleSubmit = (): void => {
    if (isDisabled || !onSubmit({ text: value, image })) return
    onChange("")
    onRemoveImage?.()
    input.current?.focus({ preventScroll: true })
  }
  return (
    <ComposerContainer
      as="form"
      flexDirection="column"
      border="1px solid"
      borderColor="mono30"
      borderRadius="15px"
      p={1}
      onSubmit={event => {
        event.preventDefault()
        handleSubmit()
      }}
    >
      {attachment && (
        <AttachmentContainer
          position="relative"
          width={64}
          height={64}
          m={1}
          mb={0}
        >
          <ImageSearchThumbnail
            src={attachment.previewURL}
            isLoading={isUploading}
            width="100%"
            height="100%"
            borderRadius={10}
          />
          {onRemoveImage && (
            <RemoveButton
              type="button"
              aria-label="Remove image"
              position="absolute"
              top={0.5}
              right={0.5}
              width={22}
              height={22}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="mono0"
              borderRadius="50%"
              onClick={() => {
                onRemoveImage()
                input.current?.focus({ preventScroll: true })
              }}
            >
              <CloseIcon width={14} height={14} aria-hidden />
            </RemoveButton>
          )}
        </AttachmentContainer>
      )}
      <TextArea
        ref={input}
        aria-label="Art Assistant prompt"
        placeholder="Tell us what you’d like…"
        value={value}
        onChange={({ value }) => onChange(value)}
        rows={1}
        style={{
          minHeight: 44,
          maxHeight: 120,
          resize: "none",
          border: "none",
        }}
        onKeyDown={event => {
          const isDesktop = window.matchMedia("(min-width: 768px)").matches
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing &&
            isDesktop
          ) {
            event.preventDefault()
            handleSubmit()
          }
        }}
      />
      <Flex alignItems="center" justifyContent="space-between" gap={1}>
        {onAddImage ? (
          <Clickable
            type="button"
            aria-label="Add an image"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={44}
            height={44}
            disabled={isResponding}
            onClick={onAddImage}
          >
            <CameraStrokeIcon width={22} height={22} aria-hidden />
          </Clickable>
        ) : (
          <Box />
        )}
        <Button size="small" height={44} type="submit" disabled={isDisabled}>
          Send
        </Button>
      </Flex>
    </ComposerContainer>
  )
}

const ComposerContainer = styled(Flex)`
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.mono60};
  }
`

const RemoveButton = styled(Clickable)`
  opacity: 0;
  transition: opacity 0.15s;
`

const AttachmentContainer = styled(Box)`
  &:hover ${RemoveButton}, ${RemoveButton}:focus-visible {
    opacity: 1;
  }

  @media (hover: none) {
    ${RemoveButton} {
      opacity: 1;
    }
  }
`
