import { OnboardingDebug } from "Components/Onboarding/Components/OnboardingDebug"
import { OnboardingSteps } from "Components/Onboarding/Components/OnboardingSteps"
import { OnboardingProvider } from "Components/Onboarding/Hooks/useOnboardingContext"
import { useRouter } from "System/Hooks/useRouter"
import { Box, Spacer } from "@artsy/palette"
import type { FC } from "react"

export const OnboardingApp: FC<React.PropsWithChildren<unknown>> = () => {
  const { router } = useRouter()

  const handleDone = () => {
    router.push("/")
  }

  return (
    <OnboardingProvider onClose={handleDone}>
      <OnboardingDebug />

      <Spacer y={2} />

      <Box height={700} border="1px dotted" borderColor="mono10">
        <OnboardingSteps />
      </Box>
    </OnboardingProvider>
  )
}
