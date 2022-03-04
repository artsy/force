import { LotTimer_saleArtwork } from "v2/__generated__/LotTimer_saleArtwork.graphql"
import { LotTimerQuery } from "v2/__generated__/LotTimerQuery.graphql"
import { SystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { DateTime } from "luxon"
import { Component, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface Props {
  saleArtwork: LotTimer_saleArtwork
}

export class LotTimer extends Component<Props> {
  get endAt() {
    const { saleArtwork } = this.props
    const { endAt } = saleArtwork

    return endAt
  }

  get startAt() {
    const { saleArtwork } = this.props
    const { sale } = saleArtwork

    return sale?.startAt
  }

  render() {
    return (
      <>
        Hi
        <Timer
          endAt={this.endAt!}
          startAt={this.startAt!}
          alignItems="center"
        />
      </>
    )
  }
}

export const LotTimerFragmentContainer = createFragmentContainer(LotTimer, {
  saleArtwork: graphql`
    fragment LotTimer_saleArtwork on SaleArtwork {
      endAt
      sale {
        startAt
      }
    }
  `,
})

export const LotTimerQueryRenderer = ({
  saleArtworkID,
}: {
  saleArtworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <SystemQueryRenderer<LotTimerQuery>
      environment={relayEnvironment}
      variables={{ saleArtworkID }}
      query={graphql`
        query LotTimerQuery($saleArtworkID: String!) {
          saleArtwork(id: $saleArtworkID) {
            ...LotTimer_saleArtwork
          }
        }
      `}
      render={({ props }) => {
        return (
          props && (
            <LotTimerFragmentContainer saleArtwork={props.saleArtwork!} />
          )
        )
      }}
    />
  )
}

import * as React from "react"
import {
  Flex,
  FlexProps,
  Text,
  TextProps,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import { useCurrentTime } from "v2/Utils/Hooks/useCurrentTime"

const SEPARATOR = <>&nbsp;&nbsp;</>

export const Timer: React.FC<
  {
    endAt: string
    startAt: string
    label?: string
  } & FlexProps &
    TextProps
> = ({ endAt, startAt, label = "", variant = "md", ...rest }) => {
  const { hasEnded, time, hasStarted } = useTimer(endAt)

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

  const timerCopy = getTimerCopy(time)

  const labelCopy = getTimerLabelCopy(endAt, startAt, hasStarted, hasEnded)

  return (
    <Flex flexDirection="column" {...rest}>
      <Text variant={tokens.variant} color={tokens.firstLineColor}>
        {label && (
          <Text variant={tokens.variant} color="black100">
            {label}
          </Text>
        )}
        {hasStarted && !hasEnded && (
          <Text color={timerCopy.color}>{timerCopy.copy}</Text>
        )}
      </Text>

      <Text variant={tokens.variant} color={tokens.secondLineColor}>
        {labelCopy}
      </Text>
    </Flex>
  )
}

export const getTimerCopy = time => {
  const { days, hours, minutes, seconds } = time

  const pDays = parseInt(days, 10)
  const pHours = parseInt(hours, 10)
  const pMinutes = parseInt(minutes, 10)
  const pSeconds = parseInt(seconds, 10)

  let copy = ""
  let color = "blue100"

  if (pDays < 1 && pHours < 1 && pMinutes <= 2) {
    copy = `${pMinutes}m ${pSeconds}s`
    color = "red100"
  }

  // More than 24 hours until close
  else if (pDays >= 1) {
    copy = `${pDays}d ${pHours}h`
  }

  // 1-24 hours until close
  else if (pDays < 1 && pHours >= 1) {
    copy = `${pHours}h ${pMinutes}m`
  }

  // 2-60 mins until close
  else if (pDays < 1 && pHours < 1 && pMinutes > 2) {
    copy = `${pMinutes}m ${pSeconds}s`
  }

  return { copy, color }
}

export const getTimerLabelCopy = (endDate, startAt, hasStarted, hasEnded) => {
  const startAtDisplay = getDateTimeDisplay(startAt)
  if (!hasStarted) {
    return startAtDisplay
  }

  if (hasEnded) {
    return "Closed"
  }

  const endAtDisplay = getDateTimeDisplay(endDate)
  return `Closes ${endAtDisplay}`
}

const getDateTimeDisplay = (date): string => {
  const dateTime = DateTime.fromISO(date)
  const amPm = dateTime.hour >= 12 ? "pm" : "am"
  const minutes = dateTime.minute < 10 ? "0" + dateTime.minute : dateTime.minute
  let hour
  if (dateTime.hour > 12) {
    hour = dateTime.hour - 12
  } else if (dateTime.hour === 0) {
    hour = 12
  } else {
    hour = dateTime.hour
  }
  // How do we get timezone here?
  return `${dateTime.monthShort} ${dateTime.day}, ${hour}:${minutes}${amPm}`
}
