import { Button, Flex, Spacer, Text } from "@artsy/palette"

export const SelectListsForArtworkHeader = () => {
  return (
    <Flex flexDirection="row" alignItems="center">
      <Flex flex={1} flexDirection="row" alignItems="center">
        <Flex flexShrink={0} width={50} height={50} bg="black10" />
        <Spacer x={1} />
        <Text>Marie Pop, The NAR, 2016</Text>
      </Flex>

      <Spacer x={1} />

      <Button variant="secondaryBlack" size="small">
        Create New List
      </Button>
    </Flex>
  )
}
