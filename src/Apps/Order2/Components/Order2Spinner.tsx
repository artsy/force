import { Box, Flex, Spinner, Text } from "@artsy/palette"

interface Order2SpinnerProps {
  state: "submit" | "reset"
}

export const Order2Spinner: React.FC<Order2SpinnerProps> = ({ state }) => {
  const showMessage = state === "submit"

  return (
    <Flex alignItems="center" flexDirection="column">
      <Box position="relative" height={100}>
        <Spinner size="large" color="blue100" />
      </Box>

      {showMessage && (
        <>
          <Text variant="md" color="mono100">
            Submitting your order
          </Text>

          <Text variant="sm" color="mono60">
            Please do not close or refresh this window
          </Text>
        </>
      )}
    </Flex>
  )
}
