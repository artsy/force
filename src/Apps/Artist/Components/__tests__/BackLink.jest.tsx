import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { BackLinkFragmentContainer } from "Apps/Artist/Components/BackLink"
import { BackLink_Test_Query } from "__generated__/BackLink_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools"
import { useSystemContext } from "System/useSystemContext"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/useSystemContext")
const mockRouterReplace = jest.fn()
jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: { replace: mockRouterReplace },
  })),
}))

const QUERY = graphql`
  query BackLink_Test_Query @relay_test_operation {
    artist(id: "example") {
      ...BackLink_artist
    }
  }
`

describe("BackLink when ff disabled", () => {
  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "cx-collector-profile": { flagEnabled: false },
      },
    }))
  })

  describe("The articles page was opened from the Artist page", () => {
    const { getWrapper } = setupTestWrapper<BackLink_Test_Query>({
      Component: props => {
        return (
          <MockBoot>
            <BackLinkFragmentContainer artist={props.artist!} />
          </MockBoot>
        )
      },
      query: QUERY,
    })

    it("renders correctly", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          name: "artistName",
        }),
      })

      expect(wrapper.text()).toContain("Back to artistName")
    })

    it("tracks correctly", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          href: "/artist/artistSlug",
        }),
      })
      wrapper.simulate("click")
      expect(trackingSpy).toHaveBeenCalledWith({
        action_type: "Click",
        destination_path: "/artist/artistSlug",
        subject: "Back to artist link",
      })
    })
  })

  describe("The articles page was opened from the My Collection Artwork page", () => {
    const artworkId = "artwork-id"
    const { getWrapper } = setupTestWrapper<BackLink_Test_Query>({
      Component: props => {
        return (
          <MockBoot>
            <BackLinkFragmentContainer
              artist={props.artist!}
              artworkId={artworkId}
            />
          </MockBoot>
        )
      },
      query: QUERY,
    })
    it("renders correctly", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          name: "artistName",
        }),
      })

      expect(wrapper.text()).toContain("Back to My Collection")
    })

    it("redirects correctly", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          href: "/artist/artistSlug",
        }),
      })

      wrapper.simulate("click")
      expect(mockRouterReplace).toHaveBeenCalledWith({
        pathname: `/my-collection/artwork/${artworkId}`,
      })
    })
  })
})

describe("BackLink when ff enabled", () => {
  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "cx-collector-profile": { flagEnabled: true },
      },
    }))
  })

  describe("The articles page was opened from the Artist page", () => {
    const { getWrapper } = setupTestWrapper<BackLink_Test_Query>({
      Component: props => {
        return (
          <MockBoot>
            <BackLinkFragmentContainer artist={props.artist!} />
          </MockBoot>
        )
      },
      query: QUERY,
    })

    it("renders correctly", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          name: "artistName",
        }),
      })

      expect(wrapper.text()).toContain("Back to artistName")
    })

    it("tracks correctly", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          href: "/artist/artistSlug",
        }),
      })
      wrapper.simulate("click")
      expect(trackingSpy).toHaveBeenCalledWith({
        action_type: "Click",
        destination_path: "/artist/artistSlug",
        subject: "Back to artist link",
      })
    })
  })

  describe("The articles page was opened from the My Collection Artwork page", () => {
    const artworkId = "artwork-id"
    const { getWrapper } = setupTestWrapper<BackLink_Test_Query>({
      Component: props => {
        return (
          <MockBoot>
            <BackLinkFragmentContainer
              artist={props.artist!}
              artworkId={artworkId}
            />
          </MockBoot>
        )
      },
      query: QUERY,
    })
    it("renders correctly", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          name: "artistName",
        }),
      })

      expect(wrapper.text()).toContain("Back to My Collection")
    })

    it("redirects correctly", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          href: "/artist/artistSlug",
        }),
      })

      wrapper.simulate("click")
      expect(mockRouterReplace).toHaveBeenCalledWith({
        pathname: `/collector-profile/my-collection/artwork/${artworkId}`,
      })
    })
  })
})
