import { Box, Checkbox, Flex, Text } from "@artsy/palette"
import type { FC } from "react"

interface OnboardingSimplifiedWelcomeStepProps {
  agreedToReceiveEmails: boolean
  shouldShowEmailOptIn: boolean
  onToggleEmailOptIn(selected: boolean): void
}

export const OnboardingSimplifiedWelcomeStep: FC<
  React.PropsWithChildren<OnboardingSimplifiedWelcomeStepProps>
> = ({ agreedToReceiveEmails, shouldShowEmailOptIn, onToggleEmailOptIn }) => {
  return (
    <Flex flexDirection="column" gap={4} height="100%" justifyContent="center">
      <Flex flexDirection="column" gap={2}>
        <Text variant="xl">Welcome to Artsy!</Text>

        <Text variant="sm">
          Discover and buy art you love from leading galleries and artists
          around the world, all in one place.
        </Text>
      </Flex>

      {shouldShowEmailOptIn && (
        <Box bg="mono5" borderRadius="5px" p={1}>
          <Checkbox
            selected={agreedToReceiveEmails}
            onSelect={onToggleEmailOptIn}
          >
            <Text variant="xs">
              Subscribe to email to hear about our products, services,
              editorials, and other promotional content. Unsubscribe at any
              time.
            </Text>
          </Checkbox>
        </Box>
      )}
    </Flex>
  )
}
