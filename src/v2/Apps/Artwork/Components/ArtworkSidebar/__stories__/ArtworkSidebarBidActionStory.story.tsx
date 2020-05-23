import {
  ArtworkFromAuctionPreview,
  ArtworkFromClosedAuction,
  ArtworkFromLiveAuctionRegistrationClosed,
  ArtworkFromLiveAuctionRegistrationOpen,
  ArtworkFromTimedAuctionRegistrationClosed,
  ArtworkFromTimedAuctionRegistrationOpen,
  BidderPendingApproval,
  IDVedUser,
  NotIDVedUser,
  NotRegisteredToBid,
  RegistedBidderWithBids,
  RegisteredBidder,
  SaleRequiringIDV,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarBidAction"
import { ArtworkSidebarBidAction as BidAction } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarBidAction"
import { merge as _merge } from "lodash"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

const merge: (...args: object[]) => any = _merge

storiesOf("Apps/Artwork/Components/Sidebar", module).add("BidAction", () => {
  return (
    <React.Fragment>
      {/* Auction in preview state */}
      <Section title="Auction Preview / Bidder not registered">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, NotRegisteredToBid)}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Auction preview / Bidder pending Approval">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, BidderPendingApproval)}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Auction preview / Registed bidder">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, RegisteredBidder)}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Auction Preview / Requires Identity Verification / No User">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, {
            sale: SaleRequiringIDV,
          })}
          me={null}
        />
      </Section>

      <Section title="Auction Preview / Requires Identity Verification / No Bidder / Not Identity Verified">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, NotRegisteredToBid, {
            sale: SaleRequiringIDV,
          })}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Auction Preview / Requires Identity Verification / No Bidder / Identity Verified">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, NotRegisteredToBid, {
            sale: SaleRequiringIDV,
          })}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Auction Preview / Requires Identity Verification / Bidder Pending / Not Identity Verified">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, BidderPendingApproval, {
            sale: SaleRequiringIDV,
          })}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Auction Preview / Requires Identity Verification / Bidder Pending / Identity Verified">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, BidderPendingApproval, {
            sale: SaleRequiringIDV,
          })}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Auction Preview / Requires Identity Verification / Bidder Approved / Identity Verified">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, RegisteredBidder, {
            sale: SaleRequiringIDV,
          })}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Auction Preview / Requires Identity Verification / Bidder Approved / Not Identity Verified">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, RegisteredBidder, {
            sale: SaleRequiringIDV,
          })}
          me={NotIDVedUser as any}
        />
      </Section>

      {/* Auction in Open state and live bidding is not started */}
      <Section title="Timed Auction or Prebidding for Live auction / Open Registration / No User">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            NotRegisteredToBid
          )}
          me={null}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Open Registration / No Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            NotRegisteredToBid
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Open Registration / No User">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            NotRegisteredToBid
          )}
          me={null}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Open Registration / No Bidder / Not Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            NotRegisteredToBid
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Open Registration / No Bidder / Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            NotRegisteredToBid
          )}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Open Registration / Bidder Pending / Not Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            BidderPendingApproval
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Open Registration / Bidder Pending / Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            BidderPendingApproval
          )}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Open Registration / Bidder Approved / Not Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Open Registration / Bidder Approved / Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            RegisteredBidder
          )}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Closed Registration / Bidder Approved / Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            { sale: SaleRequiringIDV },
            RegisteredBidder
          )}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Closed Registration / Bidder Pending / Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            { sale: SaleRequiringIDV },
            BidderPendingApproval
          )}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Requires Identity Verification / Closed Registration / Bidder Pending / Not Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            { sale: SaleRequiringIDV },
            BidderPendingApproval
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Closed Registration / Bidder not registered">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            NotRegisteredToBid
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Open Registration / Registered bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Closed Registration / Registered bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Open Registration / Registered bidder with bids">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            RegistedBidderWithBids
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Timed Auction or Prebidding for Live auction / Closed Registration / Registered bidder with bids">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            RegistedBidderWithBids
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Open Registration / No User">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            NotRegisteredToBid
          )}
          me={null}
        />
      </Section>

      <Section title="Live auction / Requires Identity Verification / Open Registration / No User">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            NotRegisteredToBid
          )}
          me={null}
        />
      </Section>
      {/* Auction in Open state and live bidding is in progress */}
      <Section title="Live auction / Open Registration / No Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            NotRegisteredToBid
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Requires Identity Verification / Open Registration / No Bidder / Not Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            NotRegisteredToBid
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Open Registration / Bidder Pending Approval">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            BidderPendingApproval
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Requires Identity Verification / Open Registration / Bidder Pending Approval / Not Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            BidderPendingApproval
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Requires Identity Verification / Open Registration / Bidder Pending Approval / Identity Verified">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            { sale: SaleRequiringIDV },
            BidderPendingApproval
          )}
          me={IDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Open Registration / Registered Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Closed registration / No Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            NotRegisteredToBid
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Closed registration / Bidder Pending Approval">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            BidderPendingApproval
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      <Section title="Live auction / Closed Registration / Registered Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      {/* Auction in Closed */}
      <Section title="Auction closed">
        <BidAction
          artwork={merge({}, ArtworkFromClosedAuction, RegisteredBidder)}
          me={NotIDVedUser as any}
        />
      </Section>
    </React.Fragment>
  )
})
