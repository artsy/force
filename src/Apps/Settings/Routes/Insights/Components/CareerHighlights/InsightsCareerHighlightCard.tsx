import { Flex, Text } from "@artsy/palette"
import {
  CareerHighlightKind,
  getCareerHighlight,
} from "Apps/Settings/Routes/Insights/Utils/getCareerHighlight"

interface InsightsCareerHighlightCardProps {
  kind: CareerHighlightKind
  count: number
}

export const InsightsCareerHighlightCard: React.FC<InsightsCareerHighlightCardProps> = ({
  count,
  kind,
}) => {
  const { label, Icon } = getCareerHighlight(kind, count)

  return (
    <Flex
      width={[205, 313]}
      height={[135, 178]}
      p={[1, 2]}
      background="white"
      border="1px solid"
      borderColor="black10"
      flexDirection="column"
    >
      <Flex justifyContent="flex-end" mb={[2, 1]}>
        <Flex
          height={[26, 30]}
          width={[26, 30]}
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="black100"
          borderRadius="50%"
        >
          <Icon fill="black100" height={20} width={20} />
        </Flex>
      </Flex>

      <Flex flexDirection="column">
        <Text variant={["lg-display", "xl"]} color="blue100" mb={[0, 1]}>
          {count}
        </Text>

        <Text variant={["xs", "sm-display"]}>{label}</Text>
      </Flex>
    </Flex>
  )
}
