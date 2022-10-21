import { Box, FairIcon, Flex, Text } from "@artsy/palette"

export const CareerHighlightModalStep = () => {
  return (
    <Flex flex={1} flexDirection="column" maxHeight="100%" mx={1}>
      <Flex alignItems="center">
        <Text flex={1} variant="xxl" color="blue100">
          12
        </Text>

        <Flex
          height={50}
          width={50}
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="black100"
          borderRadius="50%"
        >
          <FairIcon fill="black100" height={20} width={20} />
        </Flex>
      </Flex>

      <Text variant="lg">Artists had solo shows at major institutions.</Text>

      <Flex mt={2} flexDirection="column" overflowY="auto">
        {Array.from({ length: 20 }).map((_, i) => (
          <MockArtist />
        ))}
      </Flex>
    </Flex>
  )
}

const MockArtist = () => (
  <Box mb={2}>
    <Flex flex={1} flexDirection="column">
      <Flex alignItems="center">
        <Box backgroundColor="blue" width={40} height={40} borderRadius="50%" />

        <Box ml={1}>
          <Text variant="sm-display">Name</Text>
          <Text variant="xs" color="black60">
            other stuff
          </Text>
        </Box>
      </Flex>
    </Flex>
  </Box>
)
