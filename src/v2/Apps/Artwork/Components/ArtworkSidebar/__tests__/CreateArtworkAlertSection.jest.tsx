import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { CreateArtworkAlertSectionFragmentContainer } from "../CreateArtworkAlertSection"
import { CreateArtworkAlertSection_Test_Query } from "v2/__generated__/CreateArtworkAlertSection_Test_Query.graphql"
import { fireEvent, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "v2/System"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/System/useSystemContext")

const { renderWithRelay } = setupTestWrapperTL<
  CreateArtworkAlertSection_Test_Query
>({
  Component: CreateArtworkAlertSectionFragmentContainer,
  query: graphql`
    query CreateArtworkAlertSection_Test_Query @relay_test_operation {
      artwork(id: "test-artwork-id") {
        ...CreateArtworkAlertSection_artwork
      }
    }
  `,
})

describe("CreateArtworkAlertSection", () => {
  const mockuseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()
  const mockuseSystemContext = useSystemContext as jest.Mock

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent,
    }))

    mockuseSystemContext.mockImplementation(() => {
      return {
        isLoggedIn: true,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should correctly render placeholder", () => {
    const placeholder = "Artworks like: Some artwork title"
    renderWithRelay({
      Artwork: () => Artwork,
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
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
