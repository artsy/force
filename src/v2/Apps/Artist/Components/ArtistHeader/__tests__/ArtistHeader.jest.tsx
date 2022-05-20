import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistHeaderFragmentContainer } from "../ArtistHeader"
import { ArtistHeader_Test_Query } from "v2/__generated__/ArtistHeader_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/Components/SelectedCareerAchievements", () => ({
  SelectedCareerAchievementsFragmentContainer: () => null,
}))
jest.mock("react-head", () => ({ Link: () => null }))

describe("ArtistHeader", () => {
  const { getWrapper } = setupTestWrapper<ArtistHeader_Test_Query>({
    Component: ArtistHeaderFragmentContainer,
    query: graphql`
      query ArtistHeader_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistHeader_artist
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

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
        counts: { follows: 111 },
        biographyBlurb: { text: "biographyBlurbText", credit: false },
      }),
    })

    expect(wrapper.text()).toContain("artistName")
    expect(wrapper.text()).toContain("formattedNationalityAndBirthday")
    expect(wrapper.text()).toContain("111 Followers")
    expect(wrapper.text()).toContain("biographyBlurbText")
    expect(
      wrapper.find("SelectedCareerAchievementsFragmentContainer").length
    ).toBe(1)
  })

  it("hides bio section if partner supplied bio", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        biographyBlurb: { text: "biographyBlurbText", credit: true },
      }),
    })

    expect(wrapper.text()).not.toContain("biographyBlurbText")
  })

  it("hides follows if count is zero", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        counts: { follows: 0 },
      }),
    })

    expect(wrapper.text()).not.toContain("0 Followers")
  })
})
