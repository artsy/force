import { LotTimer_saleArtwork } from "v2/__generated__/LotTimer_sale.graphql"
import { LotTimerQuery } from "v2/__generated__/LotTimerQuery.graphql"
import { SystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { Timer } from "v2/Components/Timer"
import { DateTime } from "luxon"
import { Component, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface Props {
  saleArtwork: LotTimer_saleArtwork
}

export class LotTimer extends Component<Props> {
  get endDate() {
    // const { sale } = this.props
    // const { endAt } = sale

    // return this.liveStartAt || endAt
    return null
  }

  get liveStartAt() {
    // const { sale } = this.props
    // const { liveStartAt } = sale

    // // TODO: Figure out why this comes back from MP
    // if (liveStartAt !== "Invalid date") {
    //   return liveStartAt
    // }

    return null
  }
  render() {
    return (
      <>
        Hi
        <Timer
          labelWithTimeRemaining={this.labelWithTimeRemaining()}
          labelWithoutTimeRemaining={this.labelWithoutTimeRemaining()}
          endDate={this.endDate!}
          alignItems="center"
        />
      </>
    )
  }

  labelWithTimeRemaining() {
    const dateTime = DateTime.fromISO(this.endDate!)
    const amPm = dateTime.hour >= 12 ? "pm" : "am"
    const minutes =
      dateTime.minute < 10 ? "0" + dateTime.minute : dateTime.minute
    let hour
    if (dateTime.hour > 12) {
      hour = dateTime.hour - 12
    } else if (dateTime.hour === 0) {
      hour = 12
    } else {
      hour = dateTime.hour
    }
    const display = `${dateTime.monthShort} ${dateTime.day}, ${hour}:${minutes}${amPm}`
    if (this.liveStartAt) {
      return `Live ${display}`
    } else {
      return `Ends ${display}`
    }
  }

  labelWithoutTimeRemaining() {
    if (this.liveStartAt) {
      return "In progress"
    } else {
      return "Bidding closed"
    }
  }
}

export const LotTimerFragmentContainer = createFragmentContainer(LotTimer, {
  saleArtwork: graphql`
    fragment LotTimer_saleArtwork on SaleArtwork {
      endAt
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
