import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistBackLinkFragmentContainer } from "Apps/Artist/Components/ArtistBackLink"
import { ArtistBackLink_Test_Query } from "__generated__/ArtistBackLink_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<ArtistBackLink_Test_Query>({
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
    const { wrapper } = getWrapper({
      Artist: () => ({ name: "Example Artist" }),
    })

    expect(wrapper.text()).toContain("Back to Example Artist")
  })

  it("tracks correctly", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({ href: "/artist/example-artist" }),
    })

    wrapper.simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action_type: "Click",
      destination_path: "/artist/example-artist",
      subject: "Back to artist link",
    })
  })
})
