import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { ArtworkSidebarCommercialButtons_Test_Query } from "__generated__/ArtworkSidebarCommercialButtons_Test_Query.graphql"
import { Toasts, ToastsProvider } from "@artsy/palette"
import { createMockEnvironment } from "relay-test-utils"
import { MockBoot } from "DevTools/MockBoot"
import { ArtworkSidebarCommercialButtons } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercialButtons"
import { useAuthDialog } from "Components/AuthDialog"
import { useRouter } from "System/Hooks/useRouter"
import userEvent from "@testing-library/user-event"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter")

jest.mock("System/Hooks/useFeatureFlag", () => {
  return {
    useFeatureFlag: jest.fn(),
  }
})

jest.mock("Components/AuthDialog/useAuthDialog", () => ({
  useAuthDialog: jest.fn().mockReturnValue({ showAuthDialog: jest.fn() }),
}))

describe("ArtworkSidebarCommercialButtons", () => {
  let user
  let meMock

  let mockEnvironment
  const mockUseFeatureFlag = useFeatureFlag as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL<
    ArtworkSidebarCommercialButtons_Test_Query
  >({
    Component: ({ artwork, me }) => {
      return (
        <MockBoot relayEnvironment={mockEnvironment} context={{ user }}>
          <ToastsProvider>
            <Toasts />
            <ArtworkSidebarCommercialButtons artwork={artwork!} me={me!} />
          </ToastsProvider>
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkSidebarCommercialButtons_Test_Query @relay_test_operation {
        artwork(id: "josef-albers-homage-to-the-square-85") {
          ...ArtworkSidebarCommercialButtons_artwork
        }
        me {
          ...ArtworkSidebarCommercialButtons_me
            @arguments(artworkID: "josef-albers-homage-to-the-square-85")
        }
      }
    `,
  })

  beforeEach(() => {
    mockEnvironment = createMockEnvironment()
    user = { id: "123", name: "User" }
    meMock = {
      partnerOffersConnection: {
        edges: [],
      },
    }
    window.history.pushState({}, "Artwork Title", "/artwork/the-id")
  })

  afterEach(() => {
    mockEnvironment.mockClear()
  })

  describe("action buttons area for artwork with offer", () => {
    it("for artwork that BN only displays Purchase button only", async () => {
      mockUseFeatureFlag.mockImplementation(() => true)
      meMock.partnerOffersConnection.edges.push({
        node: {
          internalID: "partner-offer-id",
          isAvailable: true,
        },
      })

      renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            isAcquirable: true,
            isOfferable: false,
            isInquireable: false,
          }),
        },
        null,
        mockEnvironment
      )

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
      expect(screen.queryByText("Contact Gallery")).not.toBeInTheDocument()
    })

    it("does not add Purchase button if offer is not available", async () => {
      mockUseFeatureFlag.mockImplementation(() => true)
      meMock.partnerOffersConnection.edges.push({
        node: {
          internalID: "partner-offer-id",
          isAvailable: false,
        },
      })

      renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            isAcquirable: false,
            isOfferable: false,
            isInquireable: true,
          }),
        },
        null,
        mockEnvironment
      )

      expect(screen.queryByText("Purchase")).not.toBeInTheDocument()
    })

    it("for artwork that is MO only displays Purchase and Make offer buttons", async () => {
      mockUseFeatureFlag.mockImplementation(() => true)
      meMock.partnerOffersConnection.edges.push({
        node: {
          internalID: "partner-offer-id",
          isAvailable: true,
        },
      })

      renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            isAcquirable: false,
            isOfferable: true,
            isInquireable: false,
          }),
        },
        null,
        mockEnvironment
      )

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
      expect(screen.queryByText("Contact Gallery")).not.toBeInTheDocument()
    })

    it("for artwork that is contact gallery only displays Purchase and Contact Gallery buttons", async () => {
      mockUseFeatureFlag.mockImplementation(() => true)
      meMock.partnerOffersConnection.edges.push({
        node: {
          internalID: "partner-offer-id",
          isAvailable: true,
        },
      })

      renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            isAcquirable: false,
            isOfferable: false,
            isInquireable: true,
          }),
        },
        null,
        mockEnvironment
      )

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("for MOOEA artwork displays Purchase and Contact Gallery buttons", async () => {
      mockUseFeatureFlag.mockImplementation(() => true)
      meMock.partnerOffersConnection.edges.push({
        node: {
          internalID: "partner-offer-id",
          isAvailable: true,
        },
      })

      renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            isAcquirable: false,
            isOfferable: true,
            isInquireable: true,
          }),
        },
        null,
        mockEnvironment
      )

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })
  })

  it("displays both Make an Offer and Contact Gallery CTAs when offerable from inquiry and price range", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isPriceRange: true,
        isOfferable: true,
        isInquireable: true,
        isAcquirable: false,
      }),
    })

    expect(screen.getByText("Make an Offer")).toBeInTheDocument()
    expect(screen.getByText("Contact Gallery")).toBeInTheDocument()
  })

  it("does not display Make an Offer CTA and only the Contact Gallery CTA when offerable from inquiry and price hidden", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isInquireable: true,
        isPriceHidden: true,
        isOfferableFromInquiry: true,
      }),
    })

    expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
    expect(screen.getByText("Contact Gallery")).toBeInTheDocument()
  })

  it("displays radio buttons for Edition Sets for inquirable artworks", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isInquireable: true,
        editionSets: [
          {
            id: "for_sale_multiple_editions_edition_1",
            saleMessage: "$2,500 - 5,000",
            dimensions: {
              in: "13 × 9 1/10 × 12 3/5 in",
              cm: "33 × 23 × 32 cm",
            },
            editionOf: "Editions 3, 5, 8-10 of 123 + 0AP",
            isAcquireable: true,
            isOfferable: true,
          },
          {
            id: "for_sale_multiple_editions_edition_2",
            saleMessage: "On hold",
            dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
            editionOf: "",
            isAcquireable: true,
            isOfferable: true,
          },
          {
            id: "for_sale_multiple_editions_edition_3",
            saleMessage: "On loan",
            dimensions: { in: "222 in diameter", cm: "563.9 cm diameter" },
            editionOf: "Edition 1/234",
            isAcquireable: true,
            isOfferable: true,
          },
          {
            id: "for_sale_multiple_editions_edition_4",
            saleMessage: "Sold",
            dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
            editionOf: "",
            isAcquireable: true,
            isOfferable: true,
          },
        ],
      }),
    })

    expect(screen.getAllByRole("radio").length).toBe(4)
  })

  it("displays single editioned hidden availability inquire work", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isInquireable: true,
        editionSets: [
          {
            id: "artworkid",
            internalID: "internalid",
            isAcquireable: false,
            isOfferable: false,
            saleMessage: null,
            dimensions: { in: "20 × 24 in", cm: "50.8 × 61 cm" },
            editionOf: "Edition of 25",
          },
        ],
      }),
    })

    expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
  })

  it("displays artwork enrolled in Buy Now", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isAcquireable: true,
        isInquireable: false,
        isOfferable: false,
        editionSets: [],
      }),
    })

    expect(screen.queryByText("Purchase")).toBeInTheDocument()
  })

  it("displays sold acquireable artwork", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        saleMessage: "Sold",
        isSold: true,
      }),
    })

    expect(screen.queryByText("Sold")).toBeInTheDocument()
  })

  it("displays artwork enrolled in make offer", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        saleMessage: "$10,000",
        isOfferable: true,
      }),
    })

    expect(screen.queryByText("$10,000")).toBeInTheDocument()
    expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
  })

  it("displays artwork enrolled in Make Offer/Contact Gallery when enabled for both", async () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isOfferable: true,
        isInquireable: true,
      }),
    })

    expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
  })

  it("displays artwork enrolled in both Buy Now and Make Offer", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isAcquireable: true,
        isInquireable: false,
        isOfferable: true,
      }),
    })

    expect(screen.queryByText("Purchase")).toBeInTheDocument()
    expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
  })

  it("displays create alert button when artwork is sold", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isEligibleToCreateAlert: true,
        isSold: true,
        artists: ["artist"],
      }),
    })

    expect(screen.queryByText("Create Alert")).toBeInTheDocument()
  })

  it("hides create alert button when artwork is sold but ineligible for alerts", () => {
    renderWithRelay({
      Query: () => ({ me: meMock }),
      Artwork: () => ({
        isEligibleToCreateAlert: false,
        isSold: true,
      }),
    })

    expect(screen.queryByText("Create Alert")).not.toBeInTheDocument()
  })

  it("displays offer details when viewed by user with an active partner offer on the artwork", async () => {
    mockUseFeatureFlag.mockImplementation(() => true)
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1)
    meMock.partnerOffersConnection.edges.push({
      node: {
        internalID: "partner-offer-id",
        endAt: futureDate.toISOString(),
        isAvailable: true,
        priceWithDiscount: {
          display: "$3,350.00",
        },
      },
    })

    renderWithRelay(
      {
        Query: () => ({ me: meMock }),
        Artwork: () => ({
          priceListedDisplay: "$5,000",
        }),
      },
      null,
      mockEnvironment
    )

    expect(screen.queryByText("Limited-Time Offer")).toBeInTheDocument()
    expect(screen.queryByText("$3,350.00")).toBeInTheDocument()
    expect(screen.queryByText("(List price: $5,000)")).toBeInTheDocument()
  })

  it("does not displays offer details when viewed by user without an active partner offer on the artwork", async () => {
    mockUseFeatureFlag.mockImplementation(() => true)
    meMock.partnerOffersConnection.edges.push({
      node: {
        internalID: "partner-offer-id",
        isAvailable: false,
        priceWithDiscount: {
          display: "$3,350.00",
        },
      },
    })

    renderWithRelay(
      {
        Query: () => ({ me: meMock }),
        Artwork: () => ({
          priceListedDisplay: "$5,000",
          saleMessage: "Sold",
          isSold: true,
        }),
      },
      null,
      mockEnvironment
    )

    expect(screen.queryByText("Limited-Time Offer")).not.toBeInTheDocument()
    expect(screen.queryByText("$3,350.00")).not.toBeInTheDocument()
    expect(screen.queryByText("(List price: $5,000)")).not.toBeInTheDocument()
    expect(screen.queryByText("Sold")).toBeInTheDocument()
  })

  it("displays partner offer note if present", () => {
    mockUseFeatureFlag.mockImplementation(() => true)
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1)
    meMock.partnerOffersConnection.edges.push({
      node: {
        internalID: "partner-offer-id",
        endAt: futureDate.toISOString(),
        isAvailable: true,
        priceWithDiscount: {
          display: "$3,350.00",
        },
        note: "This is a note",
      },
    })

    renderWithRelay(
      {
        Query: () => ({ me: meMock }),
        Artwork: () => ({
          priceListedDisplay: "$5,000",
        }),
      },
      null,
      mockEnvironment
    )

    expect(screen.queryByText('"This is a note"')).toBeInTheDocument()
  })

  describe("authentication", () => {
    const mockUseRouter = useRouter as jest.Mock
    const mockUseAuthDialog = useAuthDialog as jest.Mock

    mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog: jest.fn() }))
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/artwork/artwork-1",
        },
      },
    }))

    beforeEach(() => {
      user = undefined
      meMock = null
    })

    it("opens auth modal with expected args when clicking 'buy now' button", () => {
      const showAuthDialog = jest.fn()
      mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

      renderWithRelay({
        Query: () => ({ me: meMock }),
        Artwork: () => ({
          internalID: "artwork-1",
          isAcquireable: true,
          isInquireable: false,
          isOfferable: false,
          editionSets: [
            {
              internalID: "edition-set-id",
              isAcquireable: true,
            },
          ],
        }),
      })

      fireEvent.click(screen.getByText("Purchase"))

      expect(showAuthDialog).toBeCalledWith({
        mode: "SignUp",
        options: {
          title: expect.any(Function),
          afterAuthAction: {
            action: "buyNow",
            kind: "artworks",
            objectId: "artwork-1",
            secondaryObjectId: "edition-set-id",
          },
          redirectTo: `/artwork/artwork-1?creating_order=true`,
        },
        analytics: {
          contextModule: "artworkSidebar",
          intent: "buyNow",
        },
      })
    })

    it("opens auth modal with expected args when clicking 'make offer' button", () => {
      const showAuthDialog = jest.fn()
      mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

      renderWithRelay({
        Query: () => ({ me: meMock }),
        Artwork: () => ({
          internalID: "artwork-1",
          isOfferable: true,
          editionSets: [
            {
              internalID: "edition-set-id",
              isOfferable: true,
            },
          ],
        }),
      })

      fireEvent.click(screen.getByText("Make an Offer"))

      expect(showAuthDialog).toBeCalledWith({
        mode: "SignUp",
        options: {
          title: expect.any(Function),
          afterAuthAction: {
            action: "makeOffer",
            kind: "artworks",
            objectId: "artwork-1",
            secondaryObjectId: "edition-set-id",
          },
          redirectTo: `/artwork/artwork-1?creating_order=true`,
        },
        analytics: {
          contextModule: "artworkSidebar",
          intent: "makeOffer",
        },
      })
    })
  })

  describe("Starting an order", () => {
    beforeEach(() => {
      mockUseFeatureFlag.mockImplementation(() => true)
      user = { id: "123", name: "User" }
      meMock = meMock = {
        partnerOffersConnection: {
          edges: [],
        },
      }
    })

    it("creates an offer order via mutation when clicking make offer", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            internalID: "artwork-1",
            isOfferable: true,
            editionSets: [
              {
                internalID: "edition-set-id",
                isOfferable: true,
              },
            ],
          }),
        },
        null,
        mockEnvironment
      )

      userEvent.click(screen.getByText("Make an Offer"))

      const { operationName } = await mockResolveLastOperation({})

      await waitFor(() => {
        expect(operationName).toBe(
          "ArtworkSidebarCommercialButtonsOfferOrderMutation"
        )
      })
    })

    it("creates an order via mutation when clicking 'purchase' with no partner offer", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            internalID: "artwork-1",
            isAcquireable: true,
            isOfferable: true,
            editionSets: [
              {
                internalID: "edition-set-id",
                isAcquirable: true,
              },
            ],
          }),
        },
        null,
        mockEnvironment
      )

      userEvent.click(screen.getByText("Purchase"))

      const { operationName } = await mockResolveLastOperation({})

      expect(operationName).toBe("ArtworkSidebarCommercialButtonsOrderMutation")
    })

    it("creates a partner offer order via mutation when clicking 'purchase' with an active partner offer", async () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      meMock.partnerOffersConnection.edges.push({
        node: {
          internalID: "partner-offer-id",
          endAt: futureDate.toISOString(),
        },
      })

      const { mockResolveLastOperation } = renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            internalID: "artwork-1",
            isAcquireable: true,
            editionSets: [
              {
                internalID: "edition-set-id",
                isAcquireable: true,
              },
            ],
          }),
        },
        null,
        mockEnvironment
      )

      userEvent.click(screen.getByText("Purchase"))

      const { operationName } = await mockResolveLastOperation({
        CommerceCreateOrderWithArtworkPayload: () => ({
          orderOrError: {
            __typename: "CommerceOrderWithMutationSuccess",
            order: { internalID: "order-id" },
          },
        }),
      })

      expect(operationName).toBe("UsePartnerOfferCheckoutMutation")
    })

    it("uses the regular order mutation if the partner offer expires after the page loads", async () => {
      const expiringSoon = new Date()
      expiringSoon.setSeconds(expiringSoon.getSeconds() + 1)
      meMock.partnerOffersConnection.edges.push({
        node: {
          internalID: "partner-offer-id",
          endAt: expiringSoon.toISOString(),
        },
      })

      const { mockResolveLastOperation } = renderWithRelay(
        {
          Query: () => ({ me: meMock }),
          Artwork: () => ({
            internalID: "artwork-1",
            isAcquireable: true,
            editionSets: [
              {
                internalID: "edition-set-id",
                isAcquireable: true,
              },
            ],
          }),
        },
        null,
        mockEnvironment
      )
      jest.advanceTimersByTime(1010)

      await userEvent.click(screen.getByText("Purchase"))

      const { operationName } = await mockResolveLastOperation({})
      expect(operationName).toBe("ArtworkSidebarCommercialButtonsOrderMutation")
    })
  })
})
