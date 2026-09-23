import { Flex, Pill, Text } from "@artsy/palette"
import { ONBOARDING_INTERESTS } from "Utils/onboardingInterestsPending"
import type { FC } from "react"

interface OnboardingInterestsStepProps {
  selectedInterests: string[]
  onToggleInterest(interest: string): void
}

export const OnboardingInterestsStep: FC<
  React.PropsWithChildren<OnboardingInterestsStepProps>
> = ({ selectedInterests, onToggleInterest }) => {
  return (
    <Flex flexDirection="column" pt={2}>
      <Text variant="lg-display">What are you most interested in?</Text>

      <Text variant="xs" color="mono60" mt={0.5}>
        Select all that apply
      </Text>

      <Flex flexDirection="column" alignItems="flex-start" gap={2} mt={4}>
        {ONBOARDING_INTERESTS.map(interest => {
          return (
            <Pill
              key={interest}
              selected={selectedInterests.includes(interest)}
              onClick={() => {
                onToggleInterest(interest)
              }}
            >
              {interest}
            </Pill>
          )
        })}
      </Flex>
    </Flex>
  )
}
