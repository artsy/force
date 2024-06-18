import { renderHook } from "@testing-library/react-hooks"
import { useTracking } from "react-tracking"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"

jest.mock("react-tracking")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "contextPageOwnerID",
    contextPageOwnerSlug: "contextPageOwnerSlug",
    contextPageOwnerType: "auction",
  })),
}))

describe("useAuctionTracking", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  const setupHook = () => {
    const { result } = renderHook(() => useAuctionTracking())

    if (result.error) {
      throw result.error
    }

    const tracking = result.current.tracking
    return tracking
  }

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("#addToCalendar", () => {
    setupHook().addToCalendar({ subject: "google" })

    expect(trackingSpy).toBeCalledWith({
      action: "addToCalendar",
      context_module: "auctionHome",
      context_owner_id: "contextPageOwnerID",
      context_owner_slug: "contextPageOwnerSlug",
      context_owner_type: "auction",
      subject: "google",
    })
  })

  it("#bidPageView", () => {
    setupHook().bidPageView({
      artwork: {
        slug: "artwork-slug",
        saleArtwork: {
          sale: {
            slug: "sale-slug",
            internalID: "sale-internal-id",
          },
        },
      },
      me: {
        internalID: "bar",
      },
    })

    expect(trackingSpy).toBeCalledWith({
      action: "bidPageView",
      artwork_slug: "artwork-slug",
      auction_slug: "sale-slug",
      context_page: "auctionHome",
      sale_id: "sale-internal-id",
      user_id: "bar",
    })
  })

  it("#clickedActiveBid", () => {
    setupHook().clickedActiveBid({
      artworkSlug: "artwork-slug",
      saleSlug: "sale-slug",
      userID: "user-id",
    })

    expect(trackingSpy).toBeCalledWith({
      action: "clickedActiveBid",
      artwork_slug: "artwork-slug",
      auction_slug: "sale-slug",
      user_id: "user-id",
    })
  })

  it("#clickedRegisterButton", () => {
    setupHook().clickedRegisterButton()

    expect(trackingSpy).toBeCalledWith({
      action: "clickedRegisterToBid",
      context_module: "auctionHome",
      context_owner_id: "contextPageOwnerID",
      context_owner_slug: "contextPageOwnerSlug",
      context_owner_type: "auction",
    })
  })

  it("#clickedVerifyIdentity", () => {
    setupHook().clickedVerifyIdentity({
      auctionSlug: "auction-slug",
      auctionState: "auction-state",
      userID: "user-id",
    })

    expect(trackingSpy).toBeCalledWith({
      action: "clickedVerifyIdentity",
      auction_slug: "auction-slug",
      auction_state: "auction-state",
      context_type: "auctionHome",
      description: 'Clicked "Verify identity"',
      user_id: "user-id",
    })
  })

  it("#confirmBid", () => {
    setupHook().confirmBid({
      bidderID: "bidder-id",
      positionID: "position-id",
    })

    expect(trackingSpy).toBeCalledWith({
      action: "confirmBid",
      bidder_id: "bidder-id",
      bidder_position_id: "position-id",
    })
  })

  it("#confirmRegistrationPageView", () => {
    setupHook().confirmRegistrationPageView()

    expect(trackingSpy).toBeCalledWith({
      action: "confirmRegistrationPageview",
      context_page: "auctionHome",
    })
  })

  it("#enterLiveAuction", () => {
    setupHook().enterLiveAuction({ url: "some-url" })

    expect(trackingSpy).toBeCalledWith({
      action: "enterLiveAuction",
      context_module: "auctionHome",
      destination_path: "some-url",
      subject: "Enter live auction",
    })
  })

  it("#maxBidSelected", () => {
    setupHook().maxBidSelected({ bidderID: "bidder-id", maxBid: "max-bid" })
    expect(trackingSpy).toBeCalledWith({
      action: "maxBidSelected",
      bidder_id: "bidder-id",
      selected_max_bid_minor: "max-bid",
    })
  })

  describe("#maybeTrackNewBidder", () => {
    const trackingProps = {
      bidderID: "bidder-id",
      me: {
        internalID: "foo",
      },
      result: {
        position: {
          saleArtwork: {
            sale: {
              registrationStatus: {
                internalID: "foo",
              },
            },
          },
        },
      },
      isRegistrationTracked: {
        current: true,
      },
      sale: {
        slug: "sale-slug",
        internalID: "sale-internal-id",
      },
    }

    it("does not track bidder who has already registered", () => {
      setupHook().maybeTrackNewBidder({
        ...trackingProps,
        isRegistrationTracked: {
          current: true,
        },
      })

      expect(trackingSpy).not.toBeCalled()
    })

    it("tracks new bidder", () => {
      setupHook().maybeTrackNewBidder({
        ...trackingProps,
        bidderID: null,
        isRegistrationTracked: {
          current: false,
        },
      })

      expect(trackingSpy).toHaveBeenCalledWith({
        action: "registrationSubmitted",
        auction_slug: "sale-slug",
        auction_state: undefined,
        bidder_id: "foo",
        sale_id: "sale-internal-id",
        user_id: "foo",
      })
    })
  })

  it("#registrationPageView", () => {
    setupHook().registrationPageView()
    expect(trackingSpy).toBeCalledWith({
      action: "registrationPageView",
      context_module: "auctionHome",
    })
  })

  it("#registrationSubmitted", () => {
    setupHook().registrationSubmitted({
      bidderID: "bidder-id",
      me: {
        internalID: "foo",
      },
      sale: {
        slug: "sale-slug",
        internalID: "sale-internal-id",
        status: "open",
      },
    })
    expect(trackingSpy).toBeCalledWith({
      action: "registrationSubmitted",
      auction_slug: "sale-slug",
      auction_state: "open",
      bidder_id: "bidder-id",
      sale_id: "sale-internal-id",
      user_id: "foo",
    })
  })
})
