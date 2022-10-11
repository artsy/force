import { Box, Flex, Text } from "@artsy/palette"

export const InsightsMedianSalePrice = () => {
  return (
    <Box>
      <Text variant="md">Median Auction Price in the Last 3 Years</Text>

      <Flex mt={2}>
        <Flex flex={1} flexDirection="column">
          <Flex alignItems="center">
            <Box
              backgroundColor="red"
              width={40}
              height={40}
              borderRadius="50%"
            />

            <Box ml={1}>
              <Text variant="sm-display">Name</Text>
              <Text variant="xs" color="black60">
                other stuff
              </Text>
            </Box>
          </Flex>
        </Flex>

        <Flex flex={1} flexDirection="column">
          <Flex
            minHeight={40}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Text variant="sm" color="black60">
              Type
            </Text>
            <Text variant="sm" fontWeight="semibold">
              Price
            </Text>
          </Flex>

          <Flex
            minHeight={40}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Text variant="sm" color="black60">
              Type
            </Text>
            <Text variant="sm" fontWeight="semibold">
              Price
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex mt={2}>
        <Flex flex={1} flexDirection="column">
          <Flex alignItems="center">
            <Box
              backgroundColor="blue"
              width={40}
              height={40}
              borderRadius="50%"
            />

            <Box ml={1}>
              <Text variant="sm-display">Name</Text>
              <Text variant="xs" color="black60">
                other stuff
              </Text>
            </Box>
          </Flex>
        </Flex>

        <Flex flex={1} flexDirection="column">
          <Flex
            minHeight={40}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Text variant="sm" color="black60">
              Type
            </Text>
            <Text variant="sm" fontWeight="semibold">
              Price
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
