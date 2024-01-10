import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Text } from "@artsy/palette"
import { useTimer } from "Utils/Hooks/useTimer"
import { NotificationItem_item$data } from "__generated__/NotificationItem_item.graphql"

export const ExpiresInTimer: React.FC<{ expiresAt: string }> = ({
  expiresAt,
}) => {
  const { hasEnded, time } = useTimer(expiresAt)

  if (hasEnded) {
    return (
      <Text variant="xs" color="red100">
        Expired
      </Text>
    )
  }

  const formattedTimeLeft = (time: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }) => {
    const parsedDays = parseInt(time.days, 10)
    const parsedHours = parseInt(time.hours, 10)
    const parsedMinutes = parseInt(time.minutes, 10)
    const parsedSeconds = parseInt(time.seconds, 10)

    let textColor = "blue100"
    let copy

    if (parsedDays >= 1) {
      copy = `${parsedDays} days`
    } else if (parsedDays < 1 && parsedHours >= 1) {
      copy = `${parsedHours} hours`
    } else if (parsedHours < 1 && parsedMinutes >= 1) {
      copy = `${parsedMinutes} minutes`
      textColor = "red100"
    } else if (parsedMinutes < 1) {
      copy = `${parsedSeconds} seconds`
      textColor = "red100"
    }

    return { timerCopy: copy, textColor }
  }

  const { timerCopy, textColor } = formattedTimeLeft(time)

  return (
    <Flex flexDirection="row" alignItems="center">
      <StopwatchIcon fill={textColor} height={15} width={15} mr="2px" />

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
    item.notificationType === "PARTNER_OFFER_CREATED" &&
    item.item &&
    item.item.expiresAt
  )
}
