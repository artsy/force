import { fireEvent, screen } from "@testing-library/react"
import { ArtistStylesAndTechniques } from "Apps/Artist/Components/ArtistHeader/ArtistStylesAndTechniques"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "4d8b92b34eb68a1b2c0003f4",
    contextPageOwnerSlug: "andy-warhol",
    contextPageOwnerType: "artist",
  })),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    return (
      <MockBoot breakpoint="lg">
        <ArtistStylesAndTechniques artist={(props as any).artist} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtistStylesAndTechniques_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistStylesAndTechniques_artist
      }
    }
  `,
})

describe("ArtistStylesAndTechniques", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
  })

  beforeEach(() => {
    trackEvent.mockClear()
  })

  it("renders nothing when there are no styles or techniques", () => {
    renderWithRelay({
      Artist: () => ({
        movementGenes: [],
        mediumGenes: [],
      }),
    })

    expect(screen.queryByText("Styles")).not.toBeInTheDocument()
    expect(screen.queryByText("Techniques")).not.toBeInTheDocument()
  })

  it("renders styles and techniques under their headers", () => {
    renderWithRelay({
      Artist: () => ({
        movementGenes: [
          {
            internalID: "gene-id-impressionism",
            name: "Impressionism",
            slug: "impressionism",
          },
          {
            internalID: "gene-id-post-impressionism",
            name: "Post-Impressionism",
            slug: "post-impressionism",
          },
        ],
        mediumGenes: [
          {
            internalID: "gene-id-oil-paint",
            name: "Oil Paint",
            slug: "oil-paint",
          },
          {
            internalID: "gene-id-watercolor",
            name: "Watercolor",
            slug: "watercolor",
          },
        ],
      }),
    })

    expect(screen.getByText("Styles")).toBeInTheDocument()
    expect(screen.getByText("Impressionism")).toBeInTheDocument()
    expect(screen.getByText("Post-Impressionism")).toBeInTheDocument()

    expect(screen.getByText("Techniques")).toBeInTheDocument()
    expect(screen.getByText("Oil Paint")).toBeInTheDocument()
    expect(screen.getByText("Watercolor")).toBeInTheDocument()
  })

  it("renders only the section that has genes", () => {
    renderWithRelay({
      Artist: () => ({
        movementGenes: [],
        mediumGenes: [
          {
            internalID: "gene-id-oil-paint",
            name: "Oil Paint",
            slug: "oil-paint",
          },
        ],
      }),
    })

    expect(screen.queryByText("Styles")).not.toBeInTheDocument()
    expect(screen.getByText("Techniques")).toBeInTheDocument()
    expect(screen.getByText("Oil Paint")).toBeInTheDocument()
  })

  it("links genes to their gene pages", () => {
    renderWithRelay({
      Artist: () => ({
        movementGenes: [
          {
            internalID: "gene-id-impressionism",
            name: "Impressionism",
            slug: "impressionism",
          },
        ],
        mediumGenes: [
          {
            internalID: "gene-id-oil-paint",
            name: "Oil Paint",
            slug: "oil-paint",
          },
        ],
      }),
    })

    expect(screen.getByText("Impressionism").closest("a")).toHaveAttribute(
      "href",
      "/gene/impressionism",
    )
    expect(screen.getByText("Oil Paint").closest("a")).toHaveAttribute(
      "href",
      "/gene/oil-paint",
    )
  })

  it("tracks clickedGene when clicking a gene", () => {
    renderWithRelay({
      Artist: () => ({
        movementGenes: [
          {
            internalID: "gene-id-impressionism",
            name: "Impressionism",
            slug: "impressionism",
          },
        ],
        mediumGenes: [],
      }),
    })

    fireEvent.click(screen.getByText("Impressionism"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedGene",
      context_module: "artistHeader",
      context_page_owner_type: "artist",
      context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
      context_page_owner_slug: "andy-warhol",
      destination_page_owner_type: "gene",
      destination_page_owner_id: "gene-id-impressionism",
      destination_page_owner_slug: "impressionism",
    })
  })
})
