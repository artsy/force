import { graphql } from "react-relay"
import { ArtistRelatedArtistsRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistRelatedArtistsRail"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistRelatedArtistsRailFragmentContainer,
  query: graphql`
    query ArtistRelatedArtistsRail_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistRelatedArtistsRail_artist
      }
    }
  `,
})

describe("ArtistRelatedArtistsRail", () => {
  it("renders the related artists correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Example Artist",
        formattedNationalityAndBirthday: "German, b. 1967",
      }),
    })

    expect(screen.getByText("Example Artist")).toBeInTheDocument()
    expect(screen.getByText("German, b. 1967")).toBeInTheDocument()
  })

  it("does not render if there are no related artists", () => {
    renderWithRelay({
      Artist: () => ({ related: null }),
    })

    expect(screen.queryByText("Related Artists")).not.toBeInTheDocument()
  })
})

describe("tracking", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
  })

  it("tracks clicks on related artists", () => {
    renderWithRelay({
      Artist: () => ({
        href: "/artist/example-artist",
        internalID: "exampleID",
        slug: "example-slug",
      }),
    })

    screen.getByTestId("related-artist").click()

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtistGroup",
      context_module: "relatedArtistsRail",
      destination_page_owner_id: "exampleID",
      destination_page_owner_slug: "example-slug",
      destination_page_owner_type: "artist",
      horizontal_slide_position: 1,
      type: "thumbnail",
    })
  })
})
