import { Box, Button, Checkbox, Spacer, Text } from "@artsy/palette"
import { OnboardingModal } from "Components/Onboarding/Components/OnboardingModal"
import { markOnboardingInterestsPending } from "Utils/onboardingInterestsPendingPOC"
import { type FC, useState } from "react"

const INTERESTS = [
  "Buying art",
  "Discovering art for inspiration",
  "Reading about art and artists",
  "Tracking prices and results at auction",
]

const SOURCES = [
  "Search engine",
  "Social media",
  "A friend or family member",
  "Other",
]

interface OnboardingDialogPOCProps {
  onClose(): void
  onHide(): void
}

export const OnboardingDialogPOC: FC<
  React.PropsWithChildren<OnboardingDialogPOCProps>
> = ({ onClose, onHide }) => {
  const [step, setStep] = useState<0 | 1>(0)
  const [interests, setInterests] = useState<string[]>([])
  const [source, setSource] = useState<string | null>(null)

  const toggleInterest = (interest: string) => {
    setInterests(current => {
      return current.includes(interest)
        ? current.filter(existing => existing !== interest)
        : [...current, interest]
    })
  }

  const handleFinish = () => {
    markOnboardingInterestsPending(interests)
    onHide()
  }

  return (
    <OnboardingModal onClose={onClose}>
      <Box p={4} width="100%">
        <Text variant="lg-display" mb={4}>
          {step === 0
            ? "What are you most interested in?"
            : "How did you hear about Artsy?"}
        </Text>

        {step === 0 && (
          <Box>
            {INTERESTS.map(interest => {
              return (
                <Box key={interest} mb={2}>
                  <Checkbox
                    selected={interests.includes(interest)}
                    onSelect={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Checkbox>
                </Box>
              )
            })}
          </Box>
        )}

        {step === 1 && (
          <Box>
            {SOURCES.map(option => {
              return (
                <Box key={option} mb={2}>
                  <Checkbox
                    selected={source === option}
                    onSelect={() => setSource(option)}
                  >
                    {option}
                  </Checkbox>
                </Box>
              )
            })}
          </Box>
        )}

        <Spacer y={4} />

        {step === 0 ? (
          <Button
            width="100%"
            disabled={interests.length === 0}
            onClick={() => setStep(1)}
          >
            Next
          </Button>
        ) : (
          <Button width="100%" disabled={!source} onClick={handleFinish}>
            Finish
          </Button>
        )}
      </Box>
    </OnboardingModal>
  )
}
