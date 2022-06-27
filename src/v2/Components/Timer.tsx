import * as React from "react"
import { Flex, FlexProps, Text, TextProps } from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"

const SEPARATOR = <>&nbsp;&nbsp;</>

export const Timer: React.FC<
  {
    endDate: string
    startDate?: string
    labelWithTimeRemaining?: string
    labelWithoutTimeRemaining?: string
    label?: string
  } & FlexProps &
    TextProps
> = ({
  endDate,
  startDate,
  labelWithTimeRemaining,
  labelWithoutTimeRemaining,
  label = "",
  variant = "sm-display",
  ...rest
}) => {
  const { hasEnded, time } = useTimer(endDate, startDate)
  const { days, hours, minutes, seconds } = time

  return (
    <Flex flexDirection="column" {...rest}>
      <Text variant={variant} color="blue100">
        {label && (
          <Text variant={variant} color="black100">
            {label}
          </Text>
        )}
        {days}d{SEPARATOR}
        {hours}h{SEPARATOR}
        {minutes}m{SEPARATOR}
        {seconds}s
      </Text>

      {(labelWithTimeRemaining || labelWithoutTimeRemaining) && (
        <Text variant={variant} color="black60">
          {hasEnded ? labelWithoutTimeRemaining : labelWithTimeRemaining}
        </Text>
      )}
    </Flex>
  )
}
