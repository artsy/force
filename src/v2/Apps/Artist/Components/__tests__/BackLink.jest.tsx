import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { BackLinkFragmentContainer } from "../BackLink"
import { BackLink_Test_Query } from "v2/__generated__/BackLink_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("BackLink", () => {
  const { getWrapper } = setupTestWrapper<BackLink_Test_Query>({
    Component: BackLinkFragmentContainer,
    query: graphql`
      query BackLink_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...BackLink_artist
        }
      }
    `,
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
      }),
    })

    expect(wrapper.text()).toContain("Chevron Arrow Icon Back to artistName")
  })

  it("tracks correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        slug: "artistSlug",
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
