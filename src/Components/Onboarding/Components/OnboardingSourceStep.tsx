import { Flex, Pill, Text } from "@artsy/palette"
import type { FC } from "react"

export const ONBOARDING_SOURCES = [
  "Search engine (Google, etc.)",
  "Social media (Instagram, TikTok, etc.)",
  "Art fair or gallery",
  "Friend or family",
  "AI assistant (ChatGPT, etc.)",
  "Other",
] as const

interface OnboardingSourceStepProps {
  selectedSource: string | null
  onSelectSource(source: string): void
}

export const OnboardingSourceStep: FC<
  React.PropsWithChildren<OnboardingSourceStepProps>
> = ({ selectedSource, onSelectSource }) => {
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
    </Flex>
  )
}
