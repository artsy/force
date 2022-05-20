import { Flex, Text, Spacer, Join, Button } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingWelcome = () => {
  const { next } = useOnboardingContext()

  return (
    <Flex flexDirection="column">
      <Text variant="xl">Ready to find art you love?</Text>

      <Spacer mt={4} />

      <Text variant="lg-display">
        Give us a feel for your art tastes, and we’ll match you with art you
        love.
      </Text>

      <Spacer mt={4} />

      <Join separator={<Spacer mt={0.5} />}>
        <Button onClick={next}>Get started</Button>

        <Button
          variant="secondaryOutline"
          mt={0.5}
          // @ts-ignore
          as={RouterLink}
          to="/"
        >
          Maybe later
        </Button>
      </Join>
    </Flex>
  )
}
