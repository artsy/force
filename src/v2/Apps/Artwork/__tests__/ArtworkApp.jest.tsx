import { graphql } from "react-relay"
import { ArtworkApp_Test_Query } from "v2/__generated__/ArtworkApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtworkAppFragmentContainer } from "../ArtworkApp"
import { MockBoot } from "v2/DevTools"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "anything",
      },
    },
  }),
}))

jest.mock("v2/Apps/Artwork/Components/ArtworkImageBrowser", () => ({
  ArtworkImageBrowserFragmentContainer: () => null,
}))

jest.mock("v2/Apps/Artwork/useRecordArtworkView", () => ({
  UseRecordArtworkView: () => null,
}))

const mockMatch = {
  location: {
    query: "anything",
    pathname: "anything",
  },
}

describe("ArtworkApp", () => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: jest.fn(),
  }))

  const { getWrapper } = setupTestWrapper<ArtworkApp_Test_Query>({
    Component: (props: any) => {
      return (
        <MockBoot>
          <ArtworkAppFragmentContainer {...props} match={mockMatch} />
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkApp_Test_Query @relay_test_operation {
        artwork(id: "example") {
          ...ArtworkApp_artwork
        }
        me {
          ...ArtworkApp_me
        }
      }
    `,
  })

  describe("explanatory banner for cascading", () => {
    it("includes banner when cascading is enabled", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          sale: {
            cascadingEndTimeIntervalMinutes: 1,
          },
        }),
      })
      expect(wrapper.find("CascadingEndTimesBanner").exists()).toBeTruthy()
    })

    it("hides banner when cascading is disabled", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          sale: {
            cascadingEndTimeIntervalMinutes: null,
          },
        }),
      })
      expect(wrapper.find("CascadingEndTimesBanner").exists()).toBeFalsy()
    })
  })
})
