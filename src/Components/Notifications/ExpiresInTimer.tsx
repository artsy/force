import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Text } from "@artsy/palette"
import { formattedTimeLeft } from "Components/Notifications/util"
import { useTimer } from "Utils/Hooks/useTimer"
import { NotificationItem_item$data } from "__generated__/NotificationItem_item.graphql"
import { FC } from "react"

interface ExpiresInTimerProps {
  expiresAt?: string | null
  available?: boolean | null
}

const WatchIcon: FC<{ fill?: string }> = ({ fill = "red100" }) => {
  return <StopwatchIcon fill={fill} height={15} width={15} mr="2px" ml="-2px" />
}

export const ExpiresInTimer: FC<ExpiresInTimerProps> = ({
  expiresAt = "",
  available = false,
}) => {
  const { hasEnded, time } = useTimer(expiresAt ?? "")

  if (!available) {
    return (
      <Flex flexDirection="row" alignItems="center">
        <WatchIcon />

        <Text variant="xs" color="red100">
          No longer available
        </Text>
      </Flex>
    )
  }

  if (hasEnded) {
    return (
      <Flex flexDirection="row" alignItems="center">
        <WatchIcon />

        <Text variant="xs" color="red100">
          Expired
        </Text>
      </Flex>
    )
  }

  const { timerCopy, textColor } = formattedTimeLeft(time)

  return (
    <Flex flexDirection="row" alignItems="center">
      <WatchIcon fill={textColor} />

      <Text variant="xs" color={textColor}>
        Expires in {timerCopy}
      </Text>
    </Flex>
  )
}

export const shouldDisplayExpiresInTimer = (
  item: NotificationItem_item$data
) => {
  return (
    item.notificationType === "PARTNER_OFFER_CREATED" && item?.item?.expiresAt
  )
}
