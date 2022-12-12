import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen, fireEvent } from "@testing-library/react"
import { ArtworkSidebarCommercialButtons_Test_Query } from "__generated__/ArtworkSidebarCommercialButtons_Test_Query.graphql"

import { mediator } from "Server/mediator"
import { Toasts, ToastsProvider } from "@artsy/palette"
import { createMockEnvironment } from "relay-test-utils"
import { MockBoot } from "DevTools"
import { ArtworkSidebarCommercialButtonsFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercialButtons"

jest.unmock("react-relay")

describe("ArtworkSidebarCommercialButtons", () => {
  let user
  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  let mockEnvironment = createMockEnvironment()

  const { renderWithRelay } = setupTestWrapperTL<
    ArtworkSidebarCommercialButtons_Test_Query
  >({
    Component: ({ artwork }) => (
      <MockBoot relayEnvironment={mockEnvironment} context={{ user }}>
        <ToastsProvider>
          <Toasts />
          <ArtworkSidebarCommercialButtonsFragmentContainer
            artwork={artwork!}
          />
        </ToastsProvider>
      </MockBoot>
    ),
    query: graphql`
      query ArtworkSidebarCommercialButtons_Test_Query @relay_test_operation {
        artwork(id: "josef-albers-homage-to-the-square-85") {
          ...ArtworkSidebarCommercialButtons_artwork
        }
      }
    `,
  })

  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
    user = { id: "123", name: "User" }
    window.history.pushState({}, "Artwork Title", "/artwork/the-id")
  })

  afterEach(() => {
    mockEnvironment.mockClear()
  })

  it("displays both Make an Offer and Contact Gallery CTAs when offerable from inquiry and exact price listed", () => {
    renderWithRelay({
      Artwork: () => ({
        isOfferable: true,
        isInquireable: true,
        isAcquirable: false,
      }),
    })

    expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
    expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
  })

  it("displays both Make an Offer and Contact Gallery CTAs when offerable from inquiry and price range", () => {
    renderWithRelay({
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
      Artwork: () => ({
        saleMessage: "Sold",
        isSold: true,
      }),
    })

    expect(screen.queryByText("Sold")).toBeInTheDocument()
  })

  it("displays artwork enrolled in make offer", () => {
    renderWithRelay({
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
      Artwork: () => ({
        isSold: true,
        artists: ["artist"],
      }),
    })

    expect(screen.queryByText("Create Alert")).toBeInTheDocument()
  })

  it("hides create alert button when artwork is sold but there are no associated artists", () => {
    renderWithRelay({
      Artwork: () => ({
        isSold: true,
        artists: [],
      }),
    })

    expect(screen.queryByText("Create Alert")).not.toBeInTheDocument()
  })

  describe("authentication", () => {
    beforeEach(() => {
      user = undefined
    })

    it("opens auth modal with expected args when clicking 'buy now' button", () => {
      renderWithRelay({
        Artwork: () => ({
          isAcquireable: true,
          isInquireable: false,
          isOfferable: false,
          editionSets: [],
        }),
      })

      fireEvent.click(screen.getByText("Purchase"))

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        mode: "signup",
        redirectTo: "http://localhost/artwork/the-id",
        contextModule: "artworkSidebar",
        intent: "buyNow",
        copy: "Sign up to buy art with ease",
      })
    })

    it("opens auth modal with expected args when clicking 'make offer' button", () => {
      renderWithRelay({
        Artwork: () => ({
          isOfferable: true,
        }),
      })

      fireEvent.click(screen.getByText("Make an Offer"))

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        mode: "signup",
        redirectTo: "http://localhost/artwork/the-id",
        contextModule: "artworkSidebar",
        intent: "buyNow",
        copy: "Sign up to buy art with ease",
      })
    })
  })
})
