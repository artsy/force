import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtworkSidebarCreateAlertFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCreateAlert"
import { ArtworkSidebarCreateAlert_Test_Query } from "__generated__/ArtworkSidebarCreateAlert_Test_Query.graphql"
import { fireEvent, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/useSystemContext")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkSidebarCreateAlert_Test_Query
>({
  Component: ArtworkSidebarCreateAlertFragmentContainer,
  query: graphql`
    query ArtworkSidebarCreateAlert_Test_Query @relay_test_operation {
      artwork(id: "test-artwork-id") {
        ...ArtworkSidebarCreateAlert_artwork
      }
    }
  `,
})

describe("ArtworkSidebarCreateAlert", () => {
  const mockuseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()
  const mockuseSystemContext = useSystemContext as jest.Mock

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent,
    }))

    mockuseSystemContext.mockImplementation(() => {
      return {
        isLoggedIn: true,
      }
    })
  })

  it("should not render when an artwork is ineligible for alerts", () => {
    renderWithRelay({
      Artwork: () => ({ ...Artwork, isEligibleToCreateAlert: false }),
    })

    expect(screen.queryByText("Create Alert")).not.toBeInTheDocument()
  })

  it("should correctly render pills", () => {
    renderWithRelay({
      Artwork: () => Artwork,
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(screen.getByText("Banksy")).toBeInTheDocument()
    expect(screen.getByText("Limited Edition")).toBeInTheDocument()
    expect(screen.getByText("Prints")).toBeInTheDocument()
  })

  it("should not render `Rarity` pill if needed data is missing", () => {
    renderWithRelay({
      Artwork: () => ({
        ...Artwork,
        attributionClass: null,
      }),
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(screen.queryByText("Limited Edition")).not.toBeInTheDocument()
  })

  it("should not render `Medium` pill if needed data is missing", () => {
    renderWithRelay({
      Artwork: () => ({
        ...Artwork,
        mediumType: null,
      }),
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(screen.queryByText("Prints")).not.toBeInTheDocument()
  })

  it("should correctly track event when `Create Alert` button is pressed", () => {
    renderWithRelay({
      Artwork: () => Artwork,
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedCreateAlert",
      context_page_owner_type: "artwork",
      context_page_owner_id: "artwork-id",
      context_page_owner_slug: "artwork-slug",
    })
  })
})

const Artwork = {
  title: "Some artwork title",
  slug: "artwork-slug",
  internalID: "artwork-id",
  isEligibleToCreateAlert: true,
  artists: [
    {
      internalID: "4dd1584de0091e000100207c",
      name: "Banksy",
      slug: "banksy",
    },
  ],
  attributionClass: {
    internalID: "limited edition",
  },
  mediumType: {
    filterGene: {
      slug: "prints",
      name: "Prints",
    },
  },
}
