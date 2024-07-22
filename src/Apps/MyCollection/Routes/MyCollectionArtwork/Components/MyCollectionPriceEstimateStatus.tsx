import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import { Flex, Text } from "@artsy/palette"

export const MyCollectionPriceEstimateStatus: React.FC = () => {
  return (
    <Flex alignItems="center" flexDirection="row" mb={2} mt={2}>
      <CheckmarkStrokeIcon />
      <Text variant="sm" ml={0.5}>
        Price estimate request sent
      </Text>
    </Flex>
  )
}
