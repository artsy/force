import { Button, Flex, TextArea } from "@artsy/palette"
import { useEffect, useRef, type FC } from "react"

interface ArtAssistantComposerProps {
  value: string
  isResponding: boolean
  onChange: (value: string) => void
  onSubmit: (value: string) => boolean
}

export const ArtAssistantComposer: FC<ArtAssistantComposerProps> = ({
  value,
  isResponding,
  onChange,
  onSubmit,
}) => {
  const input = useRef<HTMLTextAreaElement | null>(null)
  // biome-ignore lint/correctness/useExhaustiveDependencies: Re-measure the text after typing or clearing the draft.
  useEffect(() => {
    const element = input.current
    if (!element) return
    element.style.height = "auto"
    element.style.height = `${Math.max(44, Math.min(element.scrollHeight, 120))}px`
  }, [value])
  const handleSubmit = (): void => {
    if (isResponding || !onSubmit(value)) return
    onChange("")
    input.current?.focus({ preventScroll: true })
  }
  return (
    <Flex
      as="form"
      alignItems="flex-end"
      gap={1}
      onSubmit={event => {
        event.preventDefault()
        handleSubmit()
      }}
    >
      <TextArea
        ref={input}
        aria-label="Art Assistant prompt"
        placeholder="Tell us what you’d like…"
        value={value}
        onChange={({ value }) => onChange(value)}
        rows={1}
        style={{ minHeight: 44, maxHeight: 120, resize: "none" }}
        flex={1}
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
      <Button
        size="small"
        height={44}
        type="submit"
        disabled={isResponding || !value.trim()}
      >
        Send
      </Button>
    </Flex>
  )
}
