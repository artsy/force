import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Text } from "@artsy/palette"
import { formattedTimeLeft } from "Components/Notifications/util"
import { useTimer } from "Utils/Hooks/useTimer"
import type { FC } from "react"

interface ExpiresInTimerProps {
  expiresAt?: string | null
  available?: boolean | null
}

const WatchIcon: FC<React.PropsWithChildren<{ fill?: string }>> = ({
  fill = "red100",
}) => {
  return <StopwatchIcon fill={fill} height={15} width={15} mr="2px" ml="-2px" />
}

export const ExpiresInTimer: FC<
  React.PropsWithChildren<ExpiresInTimerProps>
> = ({ expiresAt = "", available = false }) => {
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
