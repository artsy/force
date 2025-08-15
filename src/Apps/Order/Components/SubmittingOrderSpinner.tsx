import { Box, Flex, Spinner, Text } from "@artsy/palette"

export const SubmittingOrderSpinner: React.FC = () => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Box position="relative" height={100}>
        <Spinner size="large" color="blue100" />
      </Box>

      <Text variant="md" color="mono100">
        Submitting your order
      </Text>

      <Text variant="sm" color="mono60">
        Please do not close or refresh this window
      </Text>
    </Flex>
  )
}
