import { Button, Flex, TextArea } from "@artsy/palette"
import { useRef, type FC } from "react"

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
        rows={2}
        maxHeight={160}
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
      <Button type="submit" disabled={isResponding || !value.trim()}>
        Send
      </Button>
    </Flex>
  )
}
