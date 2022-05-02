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

  describe("explanatory banner for extended end times", () => {
    it("includes banner when extended end times are enabled", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          extendedBiddingIntervalMinutes: 2,
        }),
      })
      expect(wrapper.text()).toContain(
        "Closing times may be extended due to last minute competitive bidding"
      )
    })

    it("hides banner when extended and cascading bidding are disabled", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: null,
          extendedBiddingIntervalMinutes: null,
        }),
      })
      expect(wrapper.find("CascadingEndTimesBanner").exists()).toBeFalsy()
      expect(wrapper.text()).not.toContain(
        "Closing times may be extended due to last minute competitive bidding"
      )
    })

    it("shows the cascading bidding are when cascading is enabled but popcorn is disabled", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          extendedBiddingIntervalMinutes: null,
        }),
      })
      expect(wrapper.find("CascadingEndTimesBanner").exists()).toBeTruthy()
      expect(wrapper.text()).not.toContain(
        "Closing times may be extended due to last minute competitive bidding"
      )
    })
  })
})
