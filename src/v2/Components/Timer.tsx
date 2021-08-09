import React from "react"
import {
  Flex,
  FlexProps,
  Text,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"
import { WithCurrentTime } from "v2/Components/WithCurrentTime"
import { DateTime, Duration } from "luxon"

function padWithZero(num: number) {
  return num.toString().padStart(2, "0")
}

const SEPARATOR = <>&nbsp;&nbsp;</>

export const Timer: React.FC<
  {
    endDate: string
    labelWithTimeRemaining?: string
    labelWithoutTimeRemaining?: string
    label?: string
    size?: TextVariant
  } & FlexProps
> = ({
  endDate,
  labelWithTimeRemaining,
  labelWithoutTimeRemaining,
  label = "",
  size = "md",
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: {
      variant: "mediumText" as TextVariant,
      firstLineColor: "black100",
      secondLineColor: "black100",
    },
    v3: {
      variant: size,
      firstLineColor: "blue100",
      secondLineColor: "black60",
    },
  })

  return (
    <WithCurrentTime syncWithServer>
      {currentTime => {
        const duration = Duration.fromISO(
          DateTime.fromISO(endDate)
            .diff(DateTime.fromISO(currentTime))
            .toString()
        )

        const hasEnded = Math.floor(duration.seconds) <= 0

        return (
          <Flex flexDirection="column" {...rest}>
            <Text variant={tokens.variant} color={tokens.firstLineColor}>
              {label && (
                <Text variant="md" color="black100">
                  {label}
                </Text>
              )}
              {padWithZero(Math.max(0, Math.floor(duration.as("days"))))}d
              {SEPARATOR}
              {padWithZero(Math.max(0, Math.floor(duration.as("hours") % 24)))}h
              {SEPARATOR}
              {padWithZero(
                Math.max(0, Math.floor(duration.as("minutes") % 60))
              )}
              m{SEPARATOR}
              {padWithZero(
                Math.max(0, Math.floor(duration.as("seconds") % 60))
              )}
              s
            </Text>

            {(labelWithTimeRemaining || labelWithoutTimeRemaining) && (
              <Text variant={tokens.variant} color={tokens.secondLineColor}>
                {hasEnded ? labelWithoutTimeRemaining : labelWithTimeRemaining}
              </Text>
            )}
          </Flex>
        )
      }}
    </WithCurrentTime>
  )
}
