import { Component } from "react";
import Registration from "./Registration"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { AddToCalendar } from "v2/Components/AddToCalendar/AddToCalendar"
import { data as sd } from "sharify"
import { formatIsoDateNoZoneOffset } from "v2/Components/AddToCalendar/helpers"
import { ContextModule } from "@artsy/cohesion"
import track from "react-tracking"
import Events from "v2/Utils/Events"

interface AuctionInfoDesktopProps {
  description: string
  endAt?: string
  href: string
  isAuctionPromo?: boolean
  liveAuctionUrl?: string
  liveStartAt?: string
  name: string
  showAddToCalendar: boolean
  startAt: string
  upcomingLabel?: string
}
@track({}, { dispatch: data => Events.postEvent(data) })
export class AuctionInfoDesktop extends Component<
  AuctionInfoDesktopProps
> {
  render() {
    const {
      description,
      endAt,
      href,
      isAuctionPromo,
      liveAuctionUrl,
      liveStartAt,
      name,
      startAt,
      showAddToCalendar,
      upcomingLabel,
    } = this.props

    const b = block("auction-AuctionInfo")
    const endDate = liveStartAt
      ? formatIsoDateNoZoneOffset(liveStartAt, 4)
      : endAt

    return (
      <header className={b()}>
        <div className={b("primary")}>
          {isAuctionPromo && <h4 className={b("sub-header")}>Sale Preview</h4>}

          <h1 className={b("title")}>{name}</h1>

          <div className={b("callout")}>
            <div className={b("time")}>
              {upcomingLabel && (
                <div className={b("upcomingLabel")}>{upcomingLabel}</div>
              )}

              {showAddToCalendar && (
                <AddToCalendar
                  startDate={liveStartAt || startAt}
                  endDate={endDate}
                  title={name}
                  description={description}
                  href={`${sd.APP_URL}${href}`}
                  liveAuctionUrl={liveAuctionUrl}
                  contextModule={ContextModule.auctionHome}
                />
              )}
            </div>

            {liveStartAt && (
              <div className={b("callout-live-label")}>
                <span className={b("live-label")}>Live auction</span>
                <span
                  className={b.builder()("live-tooltip").mix("help-tooltip")()}
                  data-message="Participating in a live auction means you’ll be competing against bidders in real time on an auction room floor. You can place max bids which will be represented by Artsy in the auction room or you can bid live when the auction opens."
                  data-anchor="top-left"
                />
              </div>
            )}
          </div>
          <div
            className={b("description")}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>

        <div className={b("metadata")}>
          <Registration {...this.props} />
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => {
  const { auction, liveAuctionUrl } = state.app

  return {
    description: auction.mdToHtml("description"),
    endAt: auction.get("end_at"),
    href: auction.href(),
    isAuctionPromo: auction.isAuctionPromo(),
    liveAuctionUrl,
    liveStartAt: auction.get("live_start_at"),
    name: auction.get("name"),
    showAddToCalendar: !(auction.isClosed() || auction.isLiveOpen()),
    startAt: auction.get("start_at"),
    upcomingLabel: auction.upcomingLabel(),
  }
}

export default connect(mapStateToProps)(AuctionInfoDesktop)

// Helpers
export const test = { AuctionInfoDesktop }
