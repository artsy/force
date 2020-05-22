import { AuctionTimer_sale } from "v2/__generated__/AuctionTimer_sale.graphql"
import { AuctionTimerQuery } from "v2/__generated__/AuctionTimerQuery.graphql"
import { SystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { Timer } from "v2/Components/Timer"
import { DateTime } from "luxon"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface Props {
  sale: AuctionTimer_sale
}

export class AuctionTimer extends React.Component<Props> {
  get endDate() {
    const { sale } = this.props
    const { end_at } = sale

    return this.liveStartAt || end_at
  }

  get liveStartAt() {
    const { sale } = this.props
    const { live_start_at } = sale

    // TODO: Figure out why this comes back from MP
    if (live_start_at !== "Invalid date") {
      return live_start_at
    }

    return null
  }
  render() {
    return (
      <Timer
        labelWithTimeRemaining={this.labelWithTimeRemaining()}
        labelWithoutTimeRemaining={this.labelWithoutTimeRemaining()}
        endDate={this.endDate}
      />
    )
  }

  labelWithTimeRemaining() {
    const dateTime = DateTime.fromISO(this.endDate)
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
        live_start_at: liveStartAt
        end_at: endAt
      }
    `,
  }
)

export const AuctionTimerQueryRenderer = ({ saleID }: { saleID: string }) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <QueryRenderer<AuctionTimerQuery>
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
        return props && <AuctionTimerFragmentContainer sale={props.sale} />
      }}
    />
  )
}
