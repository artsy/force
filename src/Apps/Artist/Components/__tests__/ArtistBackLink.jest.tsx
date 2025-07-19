import { screen, fireEvent } from "@testing-library/react"
import { ArtistBackLinkFragmentContainer } from "Apps/Artist/Components/ArtistBackLink"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistBackLink_Test_Query } from "__generated__/ArtistBackLink_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL<ArtistBackLink_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <ArtistBackLinkFragmentContainer artist={props.artist!} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtistBackLink_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistBackLink_artist
      }
    }
  `,
})

describe("ArtistBackLink", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({ name: "Example Artist" }),
    })

    expect(screen.getByText("Back to Example Artist")).toBeInTheDocument()
  })

  it("tracks correctly", () => {
    renderWithRelay({
      Artist: () => ({ href: "/artist/example-artist" }),
    })

    const backLink = screen.getByRole("link")
    fireEvent.click(backLink)

    expect(trackEvent).toHaveBeenCalledWith({
      action_type: "Click",
      destination_path: "/artist/example-artist",
      subject: "Back to artist link",
    })
  })
})
