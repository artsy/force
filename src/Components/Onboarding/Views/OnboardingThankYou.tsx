import { Flex, Spacer, Spinner, Text } from "@artsy/palette"
import { FC, useEffect } from "react"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { useOnboardingFadeTransition } from "Components/Onboarding/Hooks/useOnboardingFadeTransition"

interface OnboardingThankYouProps {
  autoClose?: boolean
  message: JSX.Element
}

const AUTOCLOSE_DELAY = 5000

export const OnboardingThankYou: FC<OnboardingThankYouProps> = ({
  autoClose,
  message,
}) => {
  const { register } = useOnboardingFadeTransition({ next: () => {} })
  const { onComplete, onClose } = useOnboardingContext()

  useEffect(() => {
    onComplete()

    if (autoClose) {
      setTimeout(() => {
        onClose()
      }, AUTOCLOSE_DELAY)
    }
  }, [autoClose, onComplete, onClose])

  return (
    <Flex
      ref={register(0)}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      width="100%"
      height="100%"
      p={4}
    >
      <Spinner position="static" color="blue100" />

      <Spacer y={4} />

      <Text variant="lg-display">{message}</Text>
    </Flex>
  )
}
