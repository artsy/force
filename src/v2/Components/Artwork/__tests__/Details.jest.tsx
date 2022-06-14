import { Details_Test_QueryRawResponse } from "v2/__generated__/Details_Test_Query.graphql"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"
import { DetailsFragmentContainer } from "../Details"
import { ArtworkGridContextProvider } from "v2/Components/ArtworkGrid/ArtworkGridContext"
import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { openAuthToSatisfyIntent } from "v2/Utils/openAuthModal"
import { useSystemContext } from "v2/System"

jest.unmock("react-relay")
jest.mock("v2/Utils/openAuthModal")
jest.mock("v2/System/useSystemContext")
jest.mock("v2/Utils/getCurrentTimeAsIsoString")

require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(
  "2022-03-18T05:22:32.000Z"
)

describe("Details", () => {
  const mockOpenAuthToSatisfyIntent = openAuthToSatisfyIntent as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock
  let props

  const getWrapper = async (
    response: Details_Test_QueryRawResponse["artwork"],
    restProps?: {
      hideSaleInfo: boolean
      hidePartnerName: boolean
      hideArtistName: boolean
      isHovered: boolean
      contextModule?: AuthContextModule
      showSaveButton?: boolean
    }
  ) => {
    return await renderRelayTree({
      Component: props => (
        <ArtworkGridContextProvider isAuctionArtwork>
          <DetailsFragmentContainer {...(props as any)} {...restProps} />
        </ArtworkGridContextProvider>
      ),
      query: graphql`
        query Details_Test_Query @raw_response_type @relay_test_operation {
          artwork(id: "gerhard-richter-bagdad-ii-flow-p10-1") {
            ...Details_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as Details_Test_QueryRawResponse,
    })
  }

  beforeEach(() => {
    mockUseSystemContext.mockImplementation(() => {
      return {
        isLoggedIn: false,
        mediator: jest.fn(),
      }
    })
  })

  afterEach(() => {
    mockOpenAuthToSatisfyIntent.mockClear()
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

    it("shows 'bidding closed' message if in closed auction", async () => {
      const data: any = {
        ...artworkInAuction,
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

    it("shows Contact for price if sale_message equals the same", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_message: "Contact For Price",
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

    it("skips bid information in a closed show", async () => {
      const data: any = {
        ...artworkInAuction,
        sale: {
          ...artworkInAuction?.sale,
          is_closed: true,
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
      expect(html).not.toContain("(2 bids)")
    })

    it("skips showing bid information when there are no bidder positions", async () => {
      const data: any = {
        ...artworkInAuction,
        sale_artwork: {
          ...artworkInAuction?.sale_artwork,
          counts: {
            ...artworkInAuction?.sale_artwork?.counts,
            bidder_positions: 0,
          },
        },
      }

      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).not.toContain("bid")
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

        expect(wrapper.html()).toContain("Closes, 1454d 7h")
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

        expect(wrapper.html()).toContain("Closes, 11h 11m")
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

            expect(wrapper.html()).toContain("Closes, 1m 5s")
          })
        })
      })
    })
  })

  it("should display save artwork button by default when showSaveButton prop is passed", async () => {
    props = {
      showSaveButton: true,
      contextModule: ContextModule.artworkGrid,
    }
    const wrapper = await getWrapper(artworkInAuction, props)

    expect(wrapper.find("button[data-test='saveButton']").length).toBe(1)
  })

  it("should pass correct analytics data to the auth modal when save button is pressed and user is not logged in", async () => {
    props = {
      showSaveButton: true,
      contextModule: ContextModule.artworkGrid,
    }
    const wrapper = await getWrapper(artworkInAuction, props)

    wrapper.find("button[data-test='saveButton']").simulate("click")

    expect(mockOpenAuthToSatisfyIntent.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        [MockFunction],
        Object {
          "contextModule": "artworkGrid",
          "entity": Object {
            "name": "Tulips (P17)",
            "slug": "gerhard-richter-tulips-p17-14",
          },
          "intent": "saveArtwork",
        },
      ]
    `)
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
})

const artworkInAuction: Details_Test_QueryRawResponse["artwork"] = {
  id: "opaque-artwork-id",
  internalID: "opaque-internal-id",
  artists: [
    {
      id: "QXJ0aXN0OmdlcmhhcmQtcmljaHRlcg==",
      href: "/artist/gerhard-richter",
      name: "Gerhard Richter",
    },
  ],
  slug: "gerhard-richter-tulips-p17-14",
  is_saved: false,
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
}
