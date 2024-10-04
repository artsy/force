import { Details_Test_Query$rawResponse } from "__generated__/Details_Test_Query.graphql"
import { renderRelayTree } from "DevTools/renderRelayTree"
import { graphql } from "react-relay"
import { DetailsFragmentContainer } from "Components/Artwork/Details/Details"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useAuthDialog } from "Components/AuthDialog"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
jest.mock("Utils/getCurrentTimeAsIsoString")
jest.mock("Components/AuthDialog/useAuthDialog")
jest.mock("Components/Artwork/SaveButton/SaveButton", () => ({
  SaveButtonQueryRenderer: () => <div>SaveButtonQueryRenderer</div>,
}))

jest.mock("System/Hooks/useFeatureFlag", () => {
  return {
    useFeatureFlag: jest.fn(),
  }
})

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(
  "2022-03-18T05:22:32.000Z"
)

describe("Details", () => {
  const mockUseAuthDialog = useAuthDialog as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock
  let props

  const getWrapper = async (
    response: Details_Test_Query$rawResponse["artwork"],
    restProps?: {
      showHighDemandIcon?: boolean
      hideSaleInfo: boolean
      hidePartnerName: boolean
      hideArtistName: boolean
      isHovered: boolean
      showHoverDetails?: boolean
      contextModule?: AuthContextModule
      showSaveButton?: boolean
      showSubmissionStatus?: boolean
    }
  ) => {
    return await renderRelayTree({
      Component: props => (
        <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
          <DetailsFragmentContainer {...(props as any)} {...restProps} />
        </ArtworkGridContextProvider>
      ),
      query: graphql`
        query Details_Test_Query($includeConsignmentSubmission: Boolean!)
          @raw_response_type
          @relay_test_operation {
          artwork(id: "gerhard-richter-bagdad-ii-flow-p10-1") {
            ...Details_artwork
              @arguments(
                includeConsignmentSubmission: $includeConsignmentSubmission
              )
          }
        }
      `,
      variables: {
        includeConsignmentSubmission: true,
      },
      mockData: {
        artwork: response,
      } as Details_Test_Query$rawResponse,
    })
  }

  beforeEach(() => {
    mockUseSystemContext.mockImplementation(() => {
      return {
        isLoggedIn: false,
      }
    })

    mockUseAuthDialog.mockImplementation(() => ({
      showAuthDialog: jest.fn(),
    }))
  })

  describe("in artist Notable Works rail", () => {
    it("removes artwork's partner and artist name metadata", async () => {
      props = {
        hideSaleInfo: false,
        hidePartnerName: true,
        hideArtistName: true,
      }
      const wrapper = await getWrapper(artworkInAuction, props)
      const html = wrapper.html()

      expect(html).not.toContain("Contact for Price")
      expect(html).not.toContain("Gerhard Richter")
      expect(html).not.toContain("This Really Great Gallery")
      expect(html).toContain("$2,600")
      expect(html).toContain("Tulips (P17)")
    })
  })

  describe("sale info line", () => {
    it("should render 'Bidding Closed' when the bidding for an auction has ended", async () => {
      const data: any = {
        ...artworkInAuction,
        collectorSignals: {
          primaryLabel: null,
          partnerOffer: null,
          auction: {
            ...artworkInAuction?.collectorSignals?.auction,
            liveBiddingStarted: true,
            lotClosesAt: "2022-03-12T12:33:37.000Z",
          },
        },
      }

      const wrapper = await getWrapper(data, props)
      const html = wrapper.html()

      expect(html).toContain("Bidding closed")
    })

    it("should render 'Bidding live now' when the bidding for an auction is live", async () => {
      const data: any = {
        ...artworkInAuction,
        collectorSignals: {
          primaryLabel: null,
          partnerOffer: null,
          auction: {
            ...artworkInAuction?.collectorSignals?.auction,
            liveBiddingStarted: true,
          },
        },
      }

      const wrapper = await getWrapper(data, props)
      const html = wrapper.html()

      expect(html).toContain("Bidding live now")
    })

    it("hides the sale info line when hideSaleInfo is true", async () => {
      props = {
        hideSaleInfo: true,
      }
      const wrapper = await getWrapper(artworkInAuction, props)
      const html = wrapper.html()

      expect(html).not.toContain("$2,600")
    })
  })

  describe("in sale", () => {
    it("shows highest bid if sale open and highest bid", async () => {
      const wrapper = await getWrapper(artworkInAuction)
      const html = wrapper.html()
      expect(html).toContain("$2,600")
    })

    it("shows sale_message if in closed auction", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_message: "Bidding closed",
        sale: { ...artworkInAuction?.sale, is_closed: true },
      }

      const wrapper = await getWrapper(data)
      expect(wrapper.html()).toContain("Bidding closed")
    })

    it("shows opening bid if sale open and no highest bid", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          highest_bid: {
            ...artworkInAuction?.sale_artwork?.highest_bid,
            display: null,
          },
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$2,400")
    })

    it("shows sale_message", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_message: "Price on request",
        sale: {
          ...artworkInAuction?.sale,
          is_auction: false,
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("Price on request")
    })

    it("shows sale message if sale open and no bids", async () => {
      const data: any = {
        ...artworkInAuction,
        sale: {
          ...artworkInAuction?.sale,
          is_auction: false,
        },
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          highest_bid: {
            ...artworkInAuction?.sale_artwork?.highest_bid,
            display: null,
          },
          opening_bid: {
            ...artworkInAuction?.sale_artwork?.highest_bid,
            display: null,
          },
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$450")
    })

    it("shows the number of bids in the message if sale open and are bids", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          counts: {
            ...artworkInAuction?.sale_artwork?.counts,
            bidder_positions: 2,
          },
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$2,600")
      expect(html).toContain("(2 bids)")
    })

    it("skips showing bid information when there are no bidder positions", async () => {
      const data: any = {
        ...artworkInAuction,
        collectorSignals: {
          partnerOffer: null,
          auction: {
            ...artworkInAuction?.collectorSignals?.auction,
            bidCount: 0,
          },
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).not.toContain("bid")
    })
  })

  describe("lot close info", () => {
    it("shows the lot is closed if the lot end time has passed and if the sale has cascading end times enabled", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          endAt: "2022-03-11T12:33:37.000Z",
        },
        sale: {
          ...artworkInAuction?.sale,
          cascadingEndTimeIntervalMinutes: 2,
        },
      }

      const wrapper = await getWrapper(data)
      expect(wrapper.html()).toContain("Closed")
    })

    it("shows the lot is closing with the days countdown if lots have started closing and the sale has cascading end times enabled", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          endAt: "2026-03-11T12:33:37.000Z",
        },
        sale: {
          ...artworkInAuction?.sale,
          cascadingEndTimeIntervalMinutes: 2,
          endAt: "2022-03-12T12:33:37.000Z",
        },
      }

      const wrapper = await getWrapper(data)

      expect(wrapper.html()).toContain("Closes in 1454d 7h")
    })

    it("shows the lot is closing with the hours countdown if lots are hours from closing and the sale has cascading end times enabled", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          endAt: "2022-03-18T16:33:37.000Z",
        },
        sale: {
          ...artworkInAuction?.sale,
          cascadingEndTimeIntervalMinutes: 2,
          endAt: "2022-03-18T15:33:37.000Z",
        },
      }

      const wrapper = await getWrapper(data)

      expect(wrapper.html()).toContain("Closes in 11h 11m")
    })

    it("shows the lot is closing with the formatted end time of the sale if the lots have not started closing and the sale has cascading end times enabled", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          endAt: "2026-03-11T12:33:37.000Z",
        },
        sale: {
          ...artworkInAuction?.sale,
          cascadingEndTimeIntervalMinutes: 2,
          endAt: "2030-03-12T12:33:37.000Z",
        },
      }

      const wrapper = await getWrapper(data)
      expect(wrapper.html()).toContain("Closes, Mar 12 • 12:33pm GMT")
    })

    it("does not show the lot close info if the cascading end time flag is off", async () => {
      const data: any = {
        ...artworkInAuction,
        sale: {
          ...artworkInAuction?.sale,
          cascadingEndTimeIntervalMinutes: null,
        },
      }

      const wrapper = await getWrapper(data)
      expect(wrapper.html()).not.toContain("Closed")
    })

    it("does not show the lot close info if sale is not yet open", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
        },
        sale: {
          ...artworkInAuction?.sale,
          cascadingEndTimeIntervalMinutes: 2,
          startAt: "2030-03-12T12:33:37.000Z",
        },
      }

      const wrapper = await getWrapper(data)
      expect(wrapper.html()).not.toContain("Closes")
    })

    describe("extended bidding fucntionality", () => {
      describe("bidding has been extended", () => {
        it("shows the extended label and the timer reflects the extendedBiddingEndAt", async () => {
          const data: any = {
            ...artworkInAuction,
            sale_artwork: {
              ...artworkInAuction?.sale_artwork,
              endAt: "2022-03-18T05:23:37.000Z",
              extendedBiddingEndAt: "2022-03-18T05:24:32.000Z",
            },
            sale: {
              ...artworkInAuction?.sale,
              extendedBiddingIntervalMinutes: 2,
              cascadingEndTimeIntervalMinutes: 2,
              endAt: "2022-03-18T15:33:37.000Z",
            },
          }

          const wrapper = await getWrapper(data)

          expect(wrapper.html()).toContain("Extended: 2m 0s")
        })
      })

      describe("bidding has not yet been extended", () => {
        it("shows the normal cascading timer copy", async () => {
          const data: any = {
            ...artworkInAuction,
            sale_artwork: {
              ...artworkInAuction?.sale_artwork,
              endAt: "2022-03-18T05:23:37.000Z",
              extendedBiddingEndAt: null,
            },
            sale: {
              ...artworkInAuction?.sale,
              extendedBiddingIntervalMinutes: 2,
              cascadingEndTimeIntervalMinutes: 2,
              endAt: "2022-03-18T15:33:37.000Z",
            },
          }

          const wrapper = await getWrapper(data)

          expect(wrapper.html()).toContain("Closes in 1m 5s")
        })
      })
    })
  })

  describe("Show High Demand Icon", () => {
    it("renders icon for MyCollectionArtwork in high demand", async () => {
      props = {
        showHighDemandIcon: true,
      }
      const wrapper = await getWrapper(artworkInAuction, props)

      expect(wrapper.html()).toContain("High Demand")
    })

    it("does not render high demand icon for non-MyCollectionArtwork", async () => {
      props = {
        showHighDemandIcon: false,
      }
      const wrapper = await getWrapper(artworkInAuction, props)

      expect(wrapper.html()).not.toContain("High Demand")
    })

    it("does not render high demand icon for artworks submitted for sale", async () => {
      props = {
        showHighDemandIcon: true,
        showSubmissionStatus: true,
      }
      const wrapper = await getWrapper(submittedMyCollectionArtwork, props)

      expect(wrapper.html()).not.toContain("High Demand")
    })
  })

  describe("Show Submission Status", () => {
    it("renders submission status for MyCollectionArtwork", async () => {
      const wrapper = await getWrapper(submittedMyCollectionArtwork, props)

      expect(wrapper.html()).toContain("Submitted")
    })
  })

  it("should display save artwork button by default when showSaveButton prop is passed", async () => {
    props = {
      showSaveButton: true,
      contextModule: ContextModule.artworkGrid,
    }
    const wrapper = await getWrapper(artworkInAuction, props)

    expect(wrapper.find("SaveButtonQueryRenderer").length).toBe(1)
  })

  describe("alternate metadata when hovering", () => {
    it("pills should NOT be displayed if isHovered is false", async () => {
      props = {
        isHovered: false,
      }
      const wrapper = await getWrapper(artworkInAuction, props)
      const html = wrapper.html()

      expect(html).not.toContain("Unique")
      expect(html).not.toContain("Print")
    })

    it("pills should NOT be displayed if showHoverDetails is false", async () => {
      props = {
        isHovered: true,
        showHoverDetails: false,
      }
      const wrapper = await getWrapper(artworkInAuction, props)
      const html = wrapper.html()

      expect(html).not.toContain("Unique")
      expect(html).not.toContain("Print")
    })

    it("pills should be displayed if isHovered is true", async () => {
      props = {
        isHovered: true,
      }
      const wrapper = await getWrapper(artworkInAuction, props)
      const html = wrapper.html()

      expect(html).toContain("Unique")
      expect(html).toContain("Print")
    })

    it("only Rarity pill should be displayed", async () => {
      props = {
        isHovered: true,
      }
      const data: any = {
        ...artworkInAuction,
        attributionClass: null,
      }

      const wrapper = await getWrapper(data, props)
      const html = wrapper.html()

      expect(html).not.toContain("Unique")
      expect(html).toContain("Print")
    })

    it("only Medium pill should be displayed", async () => {
      props = {
        isHovered: true,
      }
      const data: any = {
        ...artworkInAuction,
        mediumType: null,
      }

      const wrapper = await getWrapper(data, props)
      const html = wrapper.html()

      expect(html).toContain("Unique")
      expect(html).not.toContain("Print")
    })
  })

  describe("collector signals", () => {
    const mockUseFeatureFlag = useFeatureFlag as jest.Mock

    beforeEach(() => {
      mockUseFeatureFlag.mockImplementation(() => true)
    })

    it("should render the active partner offer badge when it's the primary label", async () => {
      const data: any = {
        ...artworkNotInAuction,
        collectorSignals: {
          ...artworkInAuction?.collectorSignals,
          primaryLabel: "PARTNER_OFFER",
          partnerOffer: {
            isActive: true,
            endAt: "2055-03-12T12:33:37.000Z",
            priceWithDiscount: { display: "$3,500" },
          },
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()

      expect(html).toContain("Limited-Time Offer")
      expect(html).toContain("Exp.")
      expect(html).toContain("$3,500")
    })

    it("should not render the active partner offer badge if the artwork is in an auction", async () => {
      const data: any = {
        ...artworkInAuction,
        collectorSignals: {
          ...artworkInAuction?.collectorSignals,
          partnerOffer: {
            isActive: true,
            endAt: "2055-03-12T12:33:37.000Z",
            priceWithDiscount: { display: "$2000" },
          },
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()

      expect(html).not.toContain("Limited-Time Offer")
      expect(html).not.toContain("Exp.")
      expect(html).toContain("$2,600")
    })

    it("should not render the active partner offer badge if the artwork in the activity panel", async () => {
      props = {
        contextModule: ContextModule.activity,
      }

      const data: any = {
        ...artworkNotInAuction,
        collectorSignals: {
          partnerOffer: {
            isActive: true,
            endAt: "2055-03-12T12:33:37.000Z",
            priceWithDiscount: { display: "$2000" },
          },
        },
      }

      const wrapper = await getWrapper(data, props)
      const html = wrapper.html()

      expect(html).not.toContain("Limited-Time Offer")
    })

    it("should render the curators pick badge when it's the primary label", async () => {
      const data: any = {
        ...artworkNotInAuction,
        collectorSignals: {
          ...artworkInAuction?.collectorSignals,
          primaryLabel: "CURATORS_PICK",
          partnerOffer: null,
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()

      expect(html).toContain("Curators’ Pick")
    })

    it("should render the increased interest badge when it's the primary label", async () => {
      const data: any = {
        ...artworkNotInAuction,
        collectorSignals: {
          ...artworkInAuction?.collectorSignals,
          primaryLabel: "INCREASED_INTEREST",
          partnerOffer: null,
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()

      expect(html).toContain("Increased Interest")
    })

    it("does not show the number of bids when there are bids on the sale artwork but no auction signals", async () => {
      const data: any = {
        ...artworkInAuction,
        collectorSignals: {
          ...artworkInAuction?.collectorSignals,
          auction: null,
        },
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          counts: {
            ...artworkInAuction?.sale_artwork?.counts,
            bidder_positions: 2,
          },
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$2,600")
      expect(html).not.toMatch(/\d+ bids?/)
    })
  })
})

const artworkInAuction: Details_Test_Query$rawResponse["artwork"] = {
  id: "opaque-artwork-id",
  internalID: "opaque-internal-id",
  artist: {
    id: "artist-id",
    targetSupply: {
      isP1: true,
    },
  },
  marketPriceInsights: {
    demandRank: 0.9,
  },
  artists: [
    {
      id: "QXJ0aXN0OmdlcmhhcmQtcmljaHRlcg==",
      href: "/artist/gerhard-richter",
      name: "Gerhard Richter",
    },
  ],
  href: "/artwork/gerhard-richter-tulips-p17-14",
  date: "2017",
  sale_message: "$450",
  cultural_maker: null,
  title: "Tulips (P17)",
  collecting_institution: "This Really Great Gallery",
  partner: {
    id: "opaque-partner-id",
    name: "Forum Auctions",
    href: "/auction/forum-auctions",
  },
  sale: {
    id: "opaque-sale-id",
    is_auction: true,
    is_closed: false,
    cascadingEndTimeIntervalMinutes: null,
    extendedBiddingIntervalMinutes: null,
    startAt: "2022-03-11T12:33:37.000Z",
    endAt: "2022-03-12T12:33:37.000Z",
  },
  sale_artwork: {
    lotID: "lot-id",
    lotLabel: "0",
    id: "opaque-sale-artwork-id",
    highest_bid: { display: "$2,600" },
    opening_bid: { display: "$2,400" },
    counts: { bidder_positions: 0 },
    endAt: "2022-03-12T12:33:37.000Z",
    formattedEndDateTime: "Closes, Mar 12 • 12:33pm GMT",
    extendedBiddingEndAt: null,
  },
  attributionClass: {
    id: "attributionClass-id",
    name: "Unique",
  },
  mediumType: {
    filterGene: {
      id: "gene-id",
      name: "Prints",
    },
  },
  collectorSignals: {
    primaryLabel: null,
    partnerOffer: null,
    auction: {
      bidCount: 2,
      liveBiddingStarted: false,
      lotClosesAt: new Date(Date.now() + 60 * 1000).toISOString(),
      onlineBiddingExtended: false,
      registrationEndsAt: "2022-03-5T12:33:37.000Z",
    },
  },
  consignmentSubmission: null,
  isListed: false,
}

const submittedMyCollectionArtwork: Details_Test_Query$rawResponse["artwork"] = {
  id: "opaque-artwork-id",
  internalID: "opaque-internal-id",
  artist: {
    id: "artist-id",
    targetSupply: {
      isP1: true,
    },
  },
  marketPriceInsights: {
    demandRank: 0.9,
  },
  artists: [
    {
      id: "QXJ0aXN0OmdlcmhhcmQtcmljaHRlcg==",
      href: "/artist/gerhard-richter",
      name: "Gerhard Richter",
    },
  ],
  href: "/artwork/gerhard-richter-tulips-p17-14",
  date: "2017",
  sale_message: "$450",
  cultural_maker: null,
  title: "Tulips (P17)",
  collecting_institution: "This Really Great Gallery",
  partner: {
    id: "opaque-partner-id",
    name: "Forum Auctions",
    href: "/auction/forum-auctions",
  },
  sale: {
    id: "opaque-sale-id",
    is_auction: true,
    is_closed: false,
    cascadingEndTimeIntervalMinutes: null,
    extendedBiddingIntervalMinutes: null,
    startAt: "2022-03-11T12:33:37.000Z",
    endAt: "2022-03-12T12:33:37.000Z",
  },
  sale_artwork: {
    lotID: "lot-id",
    lotLabel: "0",
    id: "opaque-sale-artwork-id",
    highest_bid: { display: "$2,600" },
    opening_bid: { display: "$2,400" },
    counts: { bidder_positions: 0 },
    endAt: "2022-03-12T12:33:37.000Z",
    formattedEndDateTime: "Closes, Mar 12 • 12:33pm GMT",
    extendedBiddingEndAt: null,
  },
  attributionClass: {
    id: "attributionClass-id",
    name: "Unique",
  },
  mediumType: {
    filterGene: {
      id: "gene-id",
      name: "Prints",
    },
  },
  collectorSignals: {
    primaryLabel: null,
    partnerOffer: null,
    auction: null,
  },
  consignmentSubmission: {
    internalID: "internal-id",
    state: "SUBMITTED",
    stateLabel: "Submitted",
    actionLabel: "Action",
    stateLabelColor: "black100",
  },
  isListed: false,
}

const artworkNotInAuction: Details_Test_Query$rawResponse["artwork"] = {
  id: "opaque-artwork-id",
  internalID: "opaque-internal-id",
  artist: {
    id: "artist-id",
    targetSupply: {
      isP1: true,
    },
  },
  marketPriceInsights: {
    demandRank: 0.9,
  },
  artists: [
    {
      id: "QXJ0aXN0OmdlcmhhcmQtcmljaHRlcg==",
      href: "/artist/gerhard-richter",
      name: "Gerhard Richter",
    },
  ],
  sale: null,
  sale_artwork: null,
  href: "/artwork/gerhard-richter-tulips-p17-14",
  date: "2017",
  sale_message: "$4000",
  cultural_maker: null,
  title: "Tulips (P17)",
  collecting_institution: "This Really Great Gallery",
  partner: {
    id: "opaque-partner-id",
    name: "Forum Auctions",
    href: "/auction/forum-auctions",
  },
  attributionClass: {
    id: "attributionClass-id",
    name: "Unique",
  },
  mediumType: {
    filterGene: {
      id: "gene-id",
      name: "Prints",
    },
  },
  collectorSignals: {
    primaryLabel: null,
    partnerOffer: null,
    auction: null,
  },
  consignmentSubmission: null,
  isListed: false,
}
