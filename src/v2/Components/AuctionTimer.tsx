import { AuctionTimer_sale$data } from "v2/__generated__/AuctionTimer_sale.graphql"
import { AuctionTimerQuery } from "v2/__generated__/AuctionTimerQuery.graphql"
import { SystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { Timer } from "v2/Components/Timer"
import { DateTime } from "luxon"
import { Component, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface Props {
  sale: AuctionTimer_sale$data
}

export class AuctionTimer extends Component<Props> {
  get endDate() {
    const { sale } = this.props
    const { endAt } = sale

    return this.liveStartAt || endAt
  }

  get liveStartAt() {
    const { sale } = this.props
    const { liveStartAt } = sale

    // TODO: Figure out why this comes back from MP
    if (liveStartAt !== "Invalid date") {
      return liveStartAt
    }

    return null
  }
  render() {
    return (
      <Timer
        labelWithTimeRemaining={this.labelWithTimeRemaining()}
        labelWithoutTimeRemaining={this.labelWithoutTimeRemaining()}
        endDate={this.endDate!}
        alignItems="center"
      />
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

export const AuctionTimerFragmentContainer = createFragmentContainer(
  AuctionTimer,
  {
    sale: graphql`
      fragment AuctionTimer_sale on Sale {
        liveStartAt
        endAt
      }
    `,
  }
)

export const AuctionTimerQueryRenderer = ({ saleID }: { saleID: string }) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <SystemQueryRenderer<AuctionTimerQuery>
      environment={relayEnvironment}
      variables={{ saleID }}
      query={graphql`
        query AuctionTimerQuery($saleID: String!) {
          sale(id: $saleID) {
            ...AuctionTimer_sale
          }
        }
      `}
      render={({ props }) => {
        return props && <AuctionTimerFragmentContainer sale={props.sale!} />
      }}
    />
  )
}
