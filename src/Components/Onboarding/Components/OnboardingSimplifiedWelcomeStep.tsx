import { Box, Checkbox, Flex, Text } from "@artsy/palette"
import type { FC } from "react"

interface OnboardingSimplifiedWelcomeStepProps {
  agreedToReceiveEmails: boolean
  /** Hidden until the geo lookup resolves, so the default is never wrong */
  shouldShowEmailOptIn: boolean
  onToggleEmailOptIn(selected: boolean): void
}

export const OnboardingSimplifiedWelcomeStep: FC<
  React.PropsWithChildren<OnboardingSimplifiedWelcomeStepProps>
> = ({ agreedToReceiveEmails, shouldShowEmailOptIn, onToggleEmailOptIn }) => {
  return (
    <Flex flexDirection="column" gap={2} height="100%" justifyContent="center">
      <Text variant="xl">Welcome to Artsy!</Text>

      <Text variant="sm">
        Discover emerging artists, trending shows, gallery openings, art to
        discover in cities around the world — straight to your inbox.
      </Text>

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
