import { useEventTiming } from "Utils/Hooks/useEventTiming"
import { Text, type TextProps } from "@artsy/palette"
import type * as React from "react"

interface EventTimingProps extends TextProps {
  startAt: string
  endAt: string
  currentTime: string
}

export const EventTiming: React.FC<
  React.PropsWithChildren<EventTimingProps>
> = ({ currentTime, startAt, endAt, ...rest }) => {
  const { formattedTime } = useEventTiming({ currentTime, startAt, endAt })

  return (
    <Text variant="sm" fontWeight="bold" {...rest}>
      {formattedTime}
    </Text>
  )
}
