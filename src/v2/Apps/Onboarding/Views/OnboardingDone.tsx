import { FC, useEffect } from "react"
import { Flex, Spacer, Spinner, Text } from "@artsy/palette"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingDone: FC = () => {
  const { next } = useOnboardingContext()

  useEffect(() => {
    const timeout = setTimeout(next, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [next])

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Spinner position="static" color="brand" />

      <Spacer mt={2} />

      <Text variant="lg">
        Great start!
        <br />
        We’re adding these to your Artsy home.
      </Text>
    </Flex>
  )
}
