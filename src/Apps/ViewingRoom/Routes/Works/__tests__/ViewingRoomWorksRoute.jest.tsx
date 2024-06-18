import { useTracking } from "react-tracking"
import { renderRelayTree } from "DevTools/renderRelayTree"
import { MockBoot } from "DevTools/MockBoot"
import { graphql } from "react-relay"
import { ViewingRoomWorksRoute_Test_Query$rawResponse } from "__generated__/ViewingRoomWorksRoute_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { ViewingRoomWorksRouteFragmentContainer } from "Apps/ViewingRoom/Routes/Works/ViewingRoomWorksRoute"

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

  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: ViewingRoomWorksRoute_Test_Query$rawResponse = ViewingRoomWorksRouteFixture
  ) => {
    return await renderRelayTree({
      Component: ({ viewingRoom }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <ViewingRoomWorksRouteFragmentContainer viewingRoom={viewingRoom} />
          </MockBoot>
        )
      },
      query: graphql`
        query ViewingRoomWorksRoute_Test_Query($slug: ID!)
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
      mockData: response,
    })
  }

  const trackEvent = jest.fn()

  beforeAll(async () => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => ({ trackEvent }))
  })

  it("renders the correct components", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("Shelf").length).toBe(2)
    expect(wrapper.find("ViewingRoomArtworkDetails").length).toBe(2)
  })

  describe("ViewingRoomArtworkDetails", () => {
    let wrapper

    beforeAll(async () => {
      wrapper = (await getWrapper()).find("ViewingRoomArtworkDetails").first()
    })

    it("displays correct text", () => {
      const html = wrapper.html()
      expect(html).toContain("Bill Miles")
      expect(html).toContain("Beep Beep")
      expect(html).toContain("2015")
      expect(html).toContain("some description")
      expect(html).toContain("$500")
      expect(html).toContain('href="/artist/bill-miles')
    })

    it("displays a buy button", () => {
      expect(wrapper.find("Button").length).toBe(1)
      expect(wrapper.html()).toContain('href="/artwork/bill-miles-beep-beep')
    })

    it("tracks clicks", () => {
      wrapper.find("Button").simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "clickedBuyViewingRoom",
        context_module: "viewingRoomArtworkRail",
        destination_path: "/artwork/bill-miles-beep-beep",
        subject: "Rail",
      })
    })
  })
})

const ViewingRoomWorksRouteFixture: ViewingRoomWorksRoute_Test_Query$rawResponse = {
  viewingRoom: {
    artworksConnection: {
      edges: [
        {
          node: {
            internalID: "5de6b49aa665fc000db78197",
            images: [
              {
                internalID: "5de6b49b7bc07c0013d44b5d",
                solo: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
                resized: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95fc5c74214001104a724",
                solo: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
                resized: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95fcdc74214001104a726",
                solo: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
                resized: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
            ],
            id: "QXJ0d29yazo1ZGU2YjQ5YWE2NjVmYzAwMGRiNzgxOTc=",
            title: "Beep Beep",
            date: "2015",
            additionalInformation: "some description",
            href: "/artwork/bill-miles-beep-beep",
            artistNames: "Artist Name",
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
            slug: "bill-miles-tulips-p17-14",
            isSaved: false,
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
            preview: null,
            isSavedToList: false,
          },
        },
        {
          node: {
            internalID: "5de6b3a46882b7000eee31f8",
            images: [
              {
                internalID: "5de6b3a4a665fc000db78117",
                solo: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
                resized: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95f3ec74214001104a71d",
                solo: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
                resized: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95f45b5fef100123a168f",
                solo: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
                resized: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95f46c74214001104a720",
                solo: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
                resized: {
                  width: 500,
                  height: 500,
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
            ],
            id: "QXJ0d29yazo1ZGU2YjNhNDY4ODJiNzAwMGVlZTMxZjg=",
            title: "Please Do Not Touch",
            date: "2018",
            additionalInformation: "some description",
            href: "/artwork/emma-johnson-please-do-not-touch",
            artistNames: "Artist Name",
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
            slug: "bill-miles-tulips-p17-14",
            isSaved: false,
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
            preview: null,
            isSavedToList: false,
          },
        },
      ],
    },
  },
}
