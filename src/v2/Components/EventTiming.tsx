import React from "react"
import { Text, TextProps } from "@artsy/palette"
import { useEventTiming } from "v2/Utils/Hooks/useEventTiming"

interface EventTimingProps extends TextProps {
  startAt: string
  endAt: string
  currentTime: string
}

export const EventTiming: React.FC<EventTimingProps> = ({
  currentTime,
  startAt,
  endAt,
  ...rest
}) => {
  const { formattedTime } = useEventTiming({ currentTime, startAt, endAt })

  return (
    <Text variant="mediumText" {...rest}>
      {formattedTime}
    </Text>
  )
}
