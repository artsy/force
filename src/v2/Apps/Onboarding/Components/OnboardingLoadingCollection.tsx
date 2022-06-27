import { Flex, Spacer, Spinner, Text } from "@artsy/palette"
import { FC } from "react"

export const OnboardingLoadingCollection: FC = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      width="100%"
      height="100%"
    >
      <Spinner position="static" color="blue100" />

      <Spacer mt={4} />

      <Text variant="lg-display">
        Great choice
        <br />
        We’re finding a collection for you
      </Text>
    </Flex>
  )
}
