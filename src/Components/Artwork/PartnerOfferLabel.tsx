import { Flex, Text } from "@artsy/palette"

export const PartnerOfferLabel = () => {
  return (
    <Flex flexDirection="row">
      <Text
        variant="xs"
        color="blue100"
        backgroundColor="blue10"
        px={0.5}
        borderRadius={3}
      >
        Limited-Time Offer
      </Text>
    </Flex>
  )
}
