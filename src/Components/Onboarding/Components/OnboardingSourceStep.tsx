import { Flex, Input, Pill, Text } from "@artsy/palette"
import type { FC } from "react"

export const OTHER_SOURCE = "Other"

export const ONBOARDING_SOURCES = [
  "Search engine (Google, etc.)",
  "Social media (Instagram, TikTok, etc.)",
  "Art fair or gallery",
  "Friend or family",
  "AI assistant (ChatGPT, etc.)",
  OTHER_SOURCE,
] as const

interface OnboardingSourceStepProps {
  selectedSource: string | null
  otherText: string
  onSelectSource(source: string): void
  onChangeOtherText(text: string): void
}

export const OnboardingSourceStep: FC<
  React.PropsWithChildren<OnboardingSourceStepProps>
> = ({ selectedSource, otherText, onSelectSource, onChangeOtherText }) => {
  return (
    <Flex flexDirection="column" pt={2}>
      <Text variant="lg-display">How did you hear about Artsy?</Text>

      <Text variant="xs" color="mono60" mt={0.5}>
        Select one answer
      </Text>

      <Flex flexDirection="column" alignItems="flex-start" gap={2} mt={4}>
        {ONBOARDING_SOURCES.map(source => {
          return (
            <Pill
              key={source}
              selected={selectedSource === source}
              onClick={() => {
                onSelectSource(source)
              }}
            >
              {source}
            </Pill>
          )
        })}
      </Flex>

      {/* Sits outside the pill stack because that stack is `flex-start`, which
       * would collapse the input to its content width. */}
      {selectedSource === OTHER_SOURCE && (
        <Input
          // Clicking the pill is what reveals this, so the user is already
          // headed here.
          autoFocus
          placeholder="Tell us more"
          value={otherText}
          mt={2}
          onChange={event => {
            onChangeOtherText(event.currentTarget.value)
          }}
        />
      )}
    </Flex>
  )
}
