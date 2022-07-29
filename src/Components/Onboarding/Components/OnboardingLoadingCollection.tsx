import { Flex, Spacer, Spinner, Text } from "@artsy/palette"
import { FC } from "react"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"

interface OnboardingLoadingCollectionProps {
  type: string
}

export const OnboardingLoadingCollection: FC<OnboardingLoadingCollectionProps> = ({
  type,
}) => {
  const { register } = useOnboardingFadeTransition({ next: () => {} })

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
      {type === "thank-you-loading" ? (
        <Spinner position="static" color="white100" />
      ) : (
        <Spinner position="static" color="blue100" />
      )}

      <Spacer mt={4} />

      {type === "thank-you-loading" ? (
        <Text variant="lg-display" color="white100">
          Great start
          <br />
          Follow more as you browse and <br />
          continue tailoring Artsy to your tastes
        </Text>
      ) : (
        <Text variant="lg-display">
          Great choice
          <br />
          We’re finding a collection for you
        </Text>
      )}
    </Flex>
  )
}
