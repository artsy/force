import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Box, Clickable, Flex, Text } from "@artsy/palette"

export const SuggestedFilters: React.FC<{
  transitionToFiltersAndTrack: () => void
}> = ({ transitionToFiltersAndTrack }) => {
  return (
    <Flex justifyContent="space-between" flexDirection={"column"}>
      <Box>
        <Text variant="sm-display">Suggested Filters</Text>
      </Box>

      <Box>
        <Clickable onClick={transitionToFiltersAndTrack}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text variant="sm" color="black60" mr={0.5}>
              More Filters
            </Text>
            <ChevronRightIcon height={14} width={14} />
          </Flex>
        </Clickable>
      </Box>
    </Flex>
  )
}
