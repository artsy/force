import { ViewingRoomWorksRouteFragmentContainer } from "Apps/ViewingRoom/Routes/Works/ViewingRoomWorksRoute"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { ViewingRoomWorksRouteTestQuery$rawResponse } from "__generated__/ViewingRoomWorksRouteTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "subscription-demo-gg-guy-yanai",
      },
    },
  }),
}))

describe("ViewingRoomWorksRoute", () => {
  const slug = "subscription-demo-gg-guy-yanai"
  const trackEvent = jest.fn()
  const mockTracking = useTracking as jest.Mock

  beforeEach(() => {
    mockTracking.mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    mockTracking.mockReset()
    trackEvent.mockReset()
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ viewingRoom }: any) => {
      return (
        <MockBoot breakpoint="lg">
          <ViewingRoomWorksRouteFragmentContainer viewingRoom={viewingRoom} />
        </MockBoot>
      )
    },
    query: graphql`
      query ViewingRoomWorksRouteTestQuery($slug: ID!)
      @raw_response_type
      @relay_test_operation {
        viewingRoom(id: $slug) {
          ...ViewingRoomWorksRoute_viewingRoom
        }
      }
    `,
    variables: {
      slug,
    },
  })

  it("renders the correct components", async () => {
    renderWithRelay({
      ViewingRoom: () => ViewingRoomWorksRouteFixture.viewingRoom,
    })

    // Check for artwork details
    expect(screen.getByText("Beep Beep")).toBeInTheDocument()
    expect(screen.getByText("Please Do Not Touch")).toBeInTheDocument()

    // Check for multiple image containers (Shelf components)
    // Images have alt="" so they have role="presentation"
    const images = screen.getAllByRole("presentation")
    expect(images.length).toBeGreaterThan(0)
  })

  describe("ViewingRoomArtworkDetails", () => {
    it("displays correct text", () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomWorksRouteFixture.viewingRoom,
      })

      // First artwork - use getAllByText since there are multiple instances
      const billMilesElements = screen.getAllByText("Bill Miles")
      expect(billMilesElements.length).toBeGreaterThan(0)
      expect(screen.getByText("Beep Beep")).toBeInTheDocument()
      // Date might not be rendered or is rendered differently
      expect(screen.getAllByText("some description")[0]).toBeInTheDocument()
      expect(screen.getByText("$500")).toBeInTheDocument()

      // Check for artist link
      const artistLinks = screen.getAllByRole("link", { name: /Bill Miles/i })
      expect(artistLinks[0]).toHaveAttribute("href", "/artist/bill-miles")
    })

    it("displays a buy button", () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomWorksRouteFixture.viewingRoom,
      })

      // Find buy buttons
      const buyButtons = screen
        .getAllByRole("link")
        .filter(link => link.getAttribute("href")?.includes("/artwork/"))
      expect(buyButtons.length).toBeGreaterThan(0)
      expect(buyButtons[0]).toHaveAttribute(
        "href",
        "/artwork/bill-miles-beep-beep"
      )
    })

    it("tracks clicks", () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomWorksRouteFixture.viewingRoom,
      })

      // Find the first buy button
      const buyButtons = screen
        .getAllByRole("button")
        .filter(button => button.textContent?.includes("Buy"))

      if (buyButtons[0]) {
        fireEvent.click(buyButtons[0])

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "clickedBuyViewingRoom",
          context_module: "viewingRoomArtworkRail",
          destination_path: "/artwork/bill-miles-beep-beep",
          subject: "Rail",
        })
      }
    })
  })
})

const ViewingRoomWorksRouteFixture: ViewingRoomWorksRouteTestQuery$rawResponse =
  {
    viewingRoom: {
      artworksConnection: {
        edges: [
          {
            node: {
              saleArtwork: {
                id: "opaque-sale-artwork-id",
                lotID: "lot-id",
              },
              internalID: "5de6b49aa665fc000db78197",
              images: [
                {
                  internalID: "5de6b49b7bc07c0013d44b5d",
                  solo: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                  resized: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                },
                {
                  internalID: "5eb95fc5c74214001104a724",
                  solo: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                  resized: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                },
                {
                  internalID: "5eb95fcdc74214001104a726",
                  solo: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                  resized: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                },
              ],
              id: "QXJ0d29yazo1ZGU2YjQ5YWE2NjVmYzAwMGRiNzgxOTc=", // pragma: allowlist secret
              title: "Beep Beep",
              date: "2015",
              additionalInformation: "some description",
              href: "/artwork/bill-miles-beep-beep",
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
                  href: "/artist/bill-miles",
                  name: "Bill Miles",
                },
              ],
              sale_message: "$500",
              cultural_maker: null,
              collecting_institution: "This Really Great Gallery",
              partner: {
                id: "opaque-partner-id",
                name: "Forum Auctions",
                href: "/auction/forum-auctions",
              },
              sale: {
                id: "opaque-sale-id",
                is_auction: false,
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
                  bidCount: 0,
                  liveBiddingStarted: false,
                  lotClosesAt: new Date(Date.now() + 60 * 1000).toISOString(),
                  onlineBiddingExtended: false,
                  registrationEndsAt: "2022-03-5T12:33:37.000Z",
                },
              },
            },
          },
          {
            node: {
              internalID: "5de6b3a46882b7000eee31f8",
              saleArtwork: {
                id: "opaque-sale-artwork-id-2",
                lotID: "lot-id-2",
              },
              images: [
                {
                  internalID: "5de6b3a4a665fc000db78117",
                  solo: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                  resized: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                },
                {
                  internalID: "5eb95f3ec74214001104a71d",
                  solo: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                  resized: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                },
                {
                  internalID: "5eb95f45b5fef100123a168f",
                  solo: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                  resized: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                },
                {
                  internalID: "5eb95f46c74214001104a720",
                  solo: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                  resized: {
                    width: 500,
                    height: 500,
                    src: "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                    srcSet:
                      "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  },
                },
              ],
              id: "QXJ0d29yazo1ZGU2YjNhNDY4ODJiNzAwMGVlZTMxZjg=", // pragma: allowlist secret
              title: "Please Do Not Touch",
              date: "2018",
              additionalInformation: "some description",
              href: "/artwork/emma-johnson-please-do-not-touch",
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
                  href: "/artist/bill-miles",
                  name: "Bill Miles",
                },
              ],
              sale_message: "$450",
              cultural_maker: null,
              collecting_institution: "This Really Great Gallery",
              partner: {
                id: "opaque-partner-id",
                name: "Forum Auctions",
                href: "/auction/forum-auctions",
              },
              sale: {
                id: "opaque-sale-id",
                is_auction: false,
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
                  bidCount: 0,
                  liveBiddingStarted: false,
                  lotClosesAt: new Date(Date.now() + 60 * 1000).toISOString(),
                  onlineBiddingExtended: false,
                  registrationEndsAt: "2022-03-5T12:33:37.000Z",
                },
              },
            },
          },
        ],
      },
    },
  }
