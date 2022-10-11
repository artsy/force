import { Flex, Text } from "@artsy/palette"
import { Timer } from "Components/Timer"

interface RegistrationAuctionTimerProps {
  endAt: string | null
}

export const RegistrationAuctionTimer: React.FC<RegistrationAuctionTimerProps> = ({
  endAt,
}) => {
  if (!endAt) {
    return null
  }

  return (
    <Flex display={["none", "flex"]} ml={1}>
      <Text variant="xs" color="black60" mr={0.5}>
        Registration for this auction ends:
      </Text>
      <Timer endDate={endAt} minWidth={110} textAlign="center" variant="xs" />
    </Flex>
  )
}
