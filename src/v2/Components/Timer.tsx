import * as React from "react";
import {
  Flex,
  FlexProps,
  Text,
  TextProps,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"

const SEPARATOR = <>&nbsp;&nbsp;</>

export const Timer: React.FC<
  {
    endDate: string
    labelWithTimeRemaining?: string
    labelWithoutTimeRemaining?: string
    label?: string
  } & FlexProps &
    TextProps
> = ({
  endDate,
  labelWithTimeRemaining,
  labelWithoutTimeRemaining,
  label = "",
  variant = "md",
  ...rest
}) => {
  const { hasEnded, time } = useTimer(endDate)
  console.log("time", time)
  const { days, hours, minutes, seconds } = time

  const tokens = useThemeConfig({
    v2: {
      variant: "mediumText" as TextVariant,
      firstLineColor: "black100",
      secondLineColor: "black100",
    },
    v3: {
      variant,
      firstLineColor: "blue100",
      secondLineColor: "black60",
    },
  })

  return (
    <Flex flexDirection="column" {...rest}>
      <Text variant={tokens.variant} color={tokens.firstLineColor}>
        {label && (
          <Text variant={tokens.variant} color="black100">
            {label}
          </Text>
        )}
        {days}d{SEPARATOR}
        {hours}h{SEPARATOR}
        {minutes}m{SEPARATOR}
        {seconds}s
      </Text>

      {(labelWithTimeRemaining || labelWithoutTimeRemaining) && (
        <Text variant={tokens.variant} color={tokens.secondLineColor}>
          {hasEnded ? labelWithoutTimeRemaining : labelWithTimeRemaining}
        </Text>
      )}
    </Flex>
  )
}
