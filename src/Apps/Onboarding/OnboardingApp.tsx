import { FC } from "react"
import { Spacer, Box } from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"
import { OnboardingProvider } from "Components/Onboarding/Hooks/useOnboardingContext"
import { OnboardingDebug } from "Components/Onboarding/Components/OnboardingDebug"
import { OnboardingSteps } from "Components/Onboarding/Components/OnboardingSteps"

export const OnboardingApp: FC = () => {
  const { router } = useRouter()

  const handleDone = () => {
    router.push("/")
  }

  return (
    <OnboardingProvider onClose={handleDone}>
      <OnboardingDebug />

      <Spacer y={2} />

      <Box height={700} border="1px dotted" borderColor="black10">
        <OnboardingSteps />
      </Box>
    </OnboardingProvider>
  )
}
