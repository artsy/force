import { ContextModule } from "@artsy/cohesion"
import { screen } from "@testing-library/react"
import { DetailsFragmentContainer } from "Components/Artwork/Details/Details"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { useAuthDialog } from "Components/AuthDialog"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { Details_Test_Query } from "__generated__/Details_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
jest.mock("Utils/getCurrentTimeAsIsoString")
jest.mock("Components/AuthDialog/useAuthDialog")
jest.mock("Components/Artwork/SaveButton/SaveButton", () => ({
  SaveButtonQueryRenderer: () => <div>SaveButtonQueryRenderer</div>,
}))
jest.mock("Components/Artwork/Details/SaleMessage", () => ({
  SaleMessageQueryRenderer: () => <div>SaleMessageQueryRenderer</div>,
}))
jest.mock("Components/Artwork/Details/PrimaryLabelLine", () => ({
  PrimaryLabelLineQueryRenderer: () => <div>PrimaryLabelLineQueryRenderer</div>,
}))
jest.mock("Components/Artwork/HoverDetails", () => ({
  HoverDetailsFragmentContainer: () => (
    <div>UniqueHoverDetailsFragmentContainerPrint</div>
  ),
}))

const query = graphql`
  query Details_Test_Query @relay_test_operation {
    artwork(id: "gerhard-richter-bagdad-ii-flow-p10-1") {
      ...Details_artwork
    }
  }
`

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(
  "2022-03-18T05:22:32.000Z",
)

describe("Details", () => {
  const mockUseAuthDialog = useAuthDialog as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock

  beforeEach(() => {
    mockUseSystemContext.mockImplementation(() => ({
      isLoggedIn: false,
    }))

    mockUseAuthDialog.mockImplementation(() => ({
      showAuthDialog: jest.fn(),
    }))
  })

  describe("in artist Notable Works rail", () => {
    const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
      Component: ({ artwork }) => (
        <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
          <DetailsFragmentContainer
            artwork={artwork!}
            includeLinks
            hidePartnerName
            hideArtistName
          />
        </ArtworkGridContextProvider>
      ),
      query,
    })

    it("removes artwork's partner and artist name metadata", () => {
      renderWithRelay({
        Artwork: () => ({
          ...artworkInAuction,
        }),
      })

      // Should not show artist name
      expect(screen.queryByText("Gerhard Richter")).not.toBeInTheDocument()

      // Should not show partner name
      expect(
        screen.queryByText("This Really Great Gallery"),
      ).not.toBeInTheDocument()

      // Should show sale message
      expect(screen.getByText("SaleMessageQueryRenderer")).toBeInTheDocument()

      // Should show artwork title
      expect(
        screen.getByText("Tulips (P17)", { exact: false }),
      ).toBeInTheDocument()
    })
  })

  describe("sale info line", () => {
    describe("when bidding has ended", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer artwork={artwork!} includeLinks />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("should render 'Bidding Closed' when the bidding for an auction has ended", () => {
        renderWithRelay({
          Artwork: () => ({
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
          }),
        })

        expect(screen.getByText("Bidding closed")).toBeInTheDocument()
      })
    })

    describe("when bidding is live", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer artwork={artwork!} includeLinks />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("should render 'Bidding live now' when the bidding for an auction is live", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
            collectorSignals: {
              primaryLabel: null,
              partnerOffer: null,
              auction: {
                ...artworkInAuction?.collectorSignals?.auction,
                liveBiddingStarted: true,
              },
            },
          }),
        })

        expect(screen.getByText("Bidding live now")).toBeInTheDocument()
      })
    })

    describe("when hide sale info is true", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer
              artwork={artwork!}
              includeLinks
              hideSaleInfo
            />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("hides the sale info line when hideSaleInfo is true", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
          }),
        })

        expect(
          screen.queryByText("SaleMessageQueryRenderer"),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("in sale", () => {
    const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
      Component: ({ artwork }) => (
        <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
          <DetailsFragmentContainer artwork={artwork!} includeLinks />
        </ArtworkGridContextProvider>
      ),
      query,
    })

    it("shows sale message", () => {
      renderWithRelay({
        Artwork: () => ({
          ...artworkInAuction,
          sale_message: "Price on request",
          sale: {
            ...artworkInAuction?.sale,
            is_auction: false,
          },
        }),
      })

      expect(screen.getByText("SaleMessageQueryRenderer")).toBeInTheDocument()
    })

    it("shows the number of bids in the message if sale open and are bids", () => {
      renderWithRelay({
        Artwork: () => ({
          ...artworkInAuction,
          sale_artwork: {
            ...artworkInAuction?.sale_artwork,
            counts: {
              ...artworkInAuction?.sale_artwork?.counts,
              bidder_positions: 2,
            },
          },
        }),
      })

      expect(screen.getByText("SaleMessageQueryRenderer")).toBeInTheDocument()
      expect(screen.getByText(/\(2 bids\)/)).toBeInTheDocument()
    })

    it("skips showing bid information when there are no bidder positions", () => {
      renderWithRelay({
        Artwork: () => ({
          ...artworkInAuction,
          collectorSignals: {
            partnerOffer: null,
            auction: {
              ...artworkInAuction?.collectorSignals?.auction,
              bidCount: 0,
            },
          },
        }),
      })

      expect(screen.queryByText(/\([0-9]+ bids?\)/)).not.toBeInTheDocument()
    })
  })

  describe("Show High Demand Icon", () => {
    describe("with high demand icon", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer
              artwork={artwork!}
              includeLinks
              showHighDemandIcon
            />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("renders icon for MyCollectionArtwork in high demand", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
          }),
        })

        // The component uses a complex structure with a HighDemandIcon component and text
        expect(screen.getByText(/High Demand/)).toBeInTheDocument()
      })
    })

    describe("without high demand icon", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer
              artwork={artwork!}
              includeLinks
              showHighDemandIcon={false}
            />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("does not render high demand icon for non-MyCollectionArtwork", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
          }),
        })

        expect(screen.queryByText(/High Demand/)).not.toBeInTheDocument()
      })
    })
  })

  describe("save button", () => {
    const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
      Component: ({ artwork }) => (
        <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
          <DetailsFragmentContainer
            artwork={artwork!}
            includeLinks
            showSaveButton
            contextModule={ContextModule.artworkGrid}
          />
        </ArtworkGridContextProvider>
      ),
      query,
    })

    it("should display save artwork button by default when showSaveButton prop is passed", () => {
      renderWithRelay({
        Artwork: () => ({
          ...artworkInAuction,
        }),
      })

      expect(screen.getByText("SaveButtonQueryRenderer")).toBeInTheDocument()
    })
  })

  describe("alternate metadata when hovering", () => {
    describe("when not hovered", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer
              artwork={artwork!}
              includeLinks
              isHovered={false}
            />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("pills should NOT be displayed if isHovered is false", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
          }),
        })

        expect(
          screen.queryByText("UniqueHoverDetailsFragmentContainerPrint"),
        ).not.toBeInTheDocument()
      })
    })

    describe("when hovered but showHoverDetails is false", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer
              artwork={artwork!}
              includeLinks
              isHovered
              showHoverDetails={false}
            />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("pills should NOT be displayed if showHoverDetails is false", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
          }),
        })

        expect(
          screen.queryByText("UniqueHoverDetailsFragmentContainerPrint"),
        ).not.toBeInTheDocument()
      })
    })

    describe("when hovered and showHoverDetails is true", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer
              artwork={artwork!}
              includeLinks
              isHovered
            />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("pills should be displayed if isHovered is true", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
          }),
        })

        expect(
          screen.getByText("UniqueHoverDetailsFragmentContainerPrint"),
        ).toBeInTheDocument()
      })

      it("only Rarity pill should be displayed", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
            attributionClass: null,
          }),
        })

        expect(
          screen.getByText("UniqueHoverDetailsFragmentContainerPrint"),
        ).toBeInTheDocument()
      })

      it("only Medium pill should be displayed", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
            mediumType: null,
          }),
        })

        expect(
          screen.getByText("UniqueHoverDetailsFragmentContainerPrint"),
        ).toBeInTheDocument()
      })
    })
  })

  describe("collector signals", () => {
    describe("with primary label", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider
            isAuctionArtwork={false}
            saveOnlyToDefaultList
          >
            <DetailsFragmentContainer artwork={artwork!} includeLinks />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("renders the primary label", () => {
        renderWithRelay({
          Artwork: () => ({
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
          }),
        })

        expect(
          screen.getByText("PrimaryLabelLineQueryRenderer"),
        ).toBeInTheDocument()
        expect(screen.getByText("SaleMessageQueryRenderer")).toBeInTheDocument()
      })

      it("does not render the primary label if hidePrimaryLabel is true", () => {
        const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
          Component: ({ artwork }) => (
            <ArtworkGridContextProvider isAuctionArtwork={false}>
              <DetailsFragmentContainer
                artwork={artwork!}
                includeLinks
                hidePrimaryLabel
              />
            </ArtworkGridContextProvider>
          ),
          query,
        })

        renderWithRelay({
          Artwork: () => ({
            ...artworkNotInAuction,
            collectorSignals: { primaryLabel: "PARTNER_OFFER" },
          }),
        })

        expect(
          screen.queryByText("PrimaryLabelLineQueryRenderer"),
        ).not.toBeInTheDocument()
      })
    })

    describe("in auction", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider isAuctionArtwork saveOnlyToDefaultList>
            <DetailsFragmentContainer artwork={artwork!} includeLinks />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("does not render the primary label if the artwork is in an auction", () => {
        renderWithRelay({
          Artwork: () => ({
            ...artworkInAuction,
            collectorSignals: {
              ...artworkInAuction?.collectorSignals,
              partnerOffer: {
                isActive: true,
                endAt: "2055-03-12T12:33:37.000Z",
                priceWithDiscount: { display: "$2000" },
              },
            },
          }),
        })

        expect(
          screen.queryByText("PrimaryLabelLineQueryRenderer"),
        ).not.toBeInTheDocument()
        expect(screen.getByText("SaleMessageQueryRenderer")).toBeInTheDocument()
      })
    })

    describe("without auction signals", () => {
      const { renderWithRelay } = setupTestWrapperTL<Details_Test_Query>({
        Component: ({ artwork }) => (
          <ArtworkGridContextProvider
            isAuctionArtwork={false}
            saveOnlyToDefaultList
          >
            <DetailsFragmentContainer artwork={artwork!} includeLinks />
          </ArtworkGridContextProvider>
        ),
        query,
      })

      it("does not show the number of bids when there are bids on the sale artwork but no auction signals", () => {
        renderWithRelay({
          Artwork: () => ({
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
          }),
        })

        expect(screen.getByText("SaleMessageQueryRenderer")).toBeInTheDocument()
        expect(screen.queryByText(/\([0-9]+ bids?\)/)).not.toBeInTheDocument()
      })
    })
  })
})

const artworkInAuction = {
  id: "opaque-artwork-id",
  internalID: "opaque-internal-id",
  saleArtwork: {
    lotID: "lot-id",
    id: "opaque-sale-artwork-id",
  },
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
}

const artworkNotInAuction = {
  id: "opaque-artwork-id",
  internalID: "opaque-internal-id",
  saleArtwork: null,
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
}
