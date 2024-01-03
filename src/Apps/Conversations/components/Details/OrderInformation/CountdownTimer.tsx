import { ProgressBar, Text } from "@artsy/palette"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"

interface CountdownTimerProps {
  stateExpiresAt: string
  stateUpdatedAt: string
  expiryText: string
  respondByText: string
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  stateExpiresAt,
  stateUpdatedAt,
  expiryText,
  respondByText,
}: CountdownTimerProps) => {
  const { remainingTime, isImminent, percentComplete } = useCountdownTimer({
    startTime: stateUpdatedAt,
    endTime: stateExpiresAt,
  })

  const color = isImminent ? "orange150" : "green100"

  if (remainingTime === "Expired") return null

  return (
    <>
      <Text variant="sm" color={color} mt={2}>
        {remainingTime} {expiryText}
      </Text>
      <ProgressBar percentComplete={percentComplete} highlight={color} />
      <Text variant="sm">{respondByText}</Text>
    </>
  )
}
