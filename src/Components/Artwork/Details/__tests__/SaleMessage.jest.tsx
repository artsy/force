import { SaleMessageQueryRenderer } from "Components/Artwork/Details/SaleMessage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import type { CleanRelayFragment } from "Utils/typeSupport"
import { act, render, screen } from "@testing-library/react"
import type { Details_artwork$data } from "__generated__/Details_artwork.graphql"
import { DateTime } from "luxon"
import { createRef } from "react"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"

jest.unmock("react-relay")

jest.mock("System/Hooks/useSystemContext")
jest.mock("Utils/Hooks/useDidMount")
jest.mock("Utils/Hooks/useIntersectionObserver")

describe("SaleMessage", () => {
  const mockuseDidMount = useDidMount as jest.Mock
  const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock
  let mockEnvironment

  beforeEach(() => {
    mockuseDidMount.mockImplementation(() => true)

    let called = false
    mockUseIntersectionObserver.mockImplementation(({ onIntersection }) => {
      if (!called) {
        onIntersection()
        called = true
      }
      return { ref: createRef() }
    })

    mockEnvironment = createMockEnvironment()
    mockUseSystemContext.mockImplementation(() => {
      return {
        relayEnvironment: mockEnvironment,
      }
    })
  })

  describe("artwork in active auction", () => {
    describe("after fetching null partner offer", () => {
      const renderSaleMessage = artwork => {
        render(
          <SaleMessageQueryRenderer
            artwork={artwork}
            id={"opaque-internal-id"}
          />,
        )

        act(() => {
          mockEnvironment.mock.resolveMostRecentOperation(operation =>
            MockPayloadGenerator.generate(operation, {
              Artwork: () => ({
                collectorSignals: {
                  partnerOffer: null,
                },
              }),
            }),
          )
        })
      }

      it("shows highest bid when there is one", async () => {
        const artwork = {
          ...artworkNotInAuction,
          sale: {
            id: "opaque-sale-id",
            is_auction: true,
            is_closed: false,
          },
          sale_artwork: {
            id: "opaque-sale-artwork-id",
            highest_bid: { display: "$2,600" },
            opening_bid: { display: "$2,400" },
          },
        }

        renderSaleMessage(artwork)
        expect(screen.getByText("$2,600")).toBeInTheDocument()
      })

      it("shows opening bid when there is one but no highest bid", async () => {
        const artwork = {
          ...artworkNotInAuction,
          sale: {
            id: "opaque-sale-id",
            is_auction: true,
            is_closed: false,
          },
          sale_artwork: {
            id: "opaque-sale-artwork-id",
            highest_bid: null,
            opening_bid: { display: "$2,400" },
          },
        }

        renderSaleMessage(artwork)
        expect(screen.getByText("$2,400")).toBeInTheDocument()
      })

      it("does not show sale message when there is no opening bid or highest bid", async () => {
        const artwork = {
          ...artworkNotInAuction,
          sale: {
            id: "opaque-sale-id",
            is_auction: true,
            is_closed: false,
          },
          sale_artwork: {
            id: "opaque-sale-artwork-id",
            highest_bid: null,
            opening_bid: null,
          },
        }

        renderSaleMessage(artwork)
        expect(screen.queryByText("SALE MESSAGE")).not.toBeInTheDocument()
      })
    })
  })

  describe("artwork not in auction", () => {
    describe("before fetching partner offer", () => {
      it("shows the sale message of the artwork", async () => {
        render(
          <SaleMessageQueryRenderer
            artwork={artworkNotInAuction as Details_artwork$data}
            id={"opaque-internal-id"}
          />,
        )

        expect(screen.getByText("SALE MESSAGE")).toBeInTheDocument()
      })
    })

    describe("after fetching null partner offer", () => {
      it("shows the sale message of the artwork", async () => {
        render(
          <SaleMessageQueryRenderer
            artwork={artworkNotInAuction as Details_artwork$data}
            id={"opaque-internal-id"}
          />,
        )

        act(() => {
          mockEnvironment.mock.resolveMostRecentOperation(operation =>
            MockPayloadGenerator.generate(operation, {
              Artwork: () => ({
                collectorSignals: {
                  partnerOffer: null,
                },
              }),
            }),
          )
        })

        expect(screen.getByText("SALE MESSAGE")).toBeInTheDocument()
      })
    })

    describe("after fetching an active partner offer", () => {
      it("shows the partner offer instead of the sale message from artwork", async () => {
        render(
          <SaleMessageQueryRenderer
            artwork={artworkNotInAuction as Details_artwork$data}
            id={"opaque-internal-id"}
          />,
        )

        act(() => {
          mockEnvironment.mock.resolveMostRecentOperation(operation =>
            MockPayloadGenerator.generate(operation, {
              Artwork: () => ({
                collectorSignals: {
                  partnerOffer: {
                    endAt: DateTime.now()
                      .plus({ days: 1, seconds: -1 })
                      .toISO(),
                    priceWithDiscount: {
                      display: "$1,999",
                    },
                  },
                },
              }),
            }),
          )
        })

        expect(screen.getByText("$1,999")).toBeInTheDocument()
        expect(screen.getByText("Exp. 0d 23h")).toBeInTheDocument()
        expect(screen.queryByText("SALE MESSAGE")).not.toBeInTheDocument()
      })
    })
  })
})

const artworkNotInAuction: CleanRelayFragment<Details_artwork$data> = {
  internalID: "opaque-internal-id",
  artist: {
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
  sale_message: "SALE MESSAGE",
  cultural_maker: null,
  title: "Tulips (P17)",
  collecting_institution: "This Really Great Gallery",
  partner: {
    name: "Forum Auctions",
    href: "/auction/forum-auctions",
  },
  collectorSignals: {
    primaryLabel: null,
    auction: null,
  },
}
