import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Spacer } from "@artsy/palette"
import type { RemainingTime } from "Utils/Hooks/useCountdownTimer"

interface Order2OfferExpiryTimerProps {
  remainingTime: RemainingTime
  // "icon": stopwatch + "Exp. …" (pricing breakdown)
  // "inline": "(Exp. …)" with no-wrap, for use inside a sentence (review step)
  variant?: "icon" | "inline"
}

export const Order2OfferExpiryTimer: React.FC<Order2OfferExpiryTimerProps> = ({
  remainingTime,
  variant = "icon",
}) => {
  if (variant === "inline") {
    return <span style={{ whiteSpace: "nowrap" }}>(Exp. {remainingTime})</span>
  }

  return (
    <Flex alignItems="center">
      <StopwatchIcon height={18} />
      <Spacer x={0.5} />
      Exp. {remainingTime}
    </Flex>
  )
}
