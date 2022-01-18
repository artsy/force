import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistCareerHighlightsFragmentContainer } from "../ArtistCareerHighlights"
import { ArtistCareerHighlights_Test_Query } from "v2/__generated__/ArtistCareerHighlights_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("v2/Components/SelectedCareerAchievements", () => ({
  SelectedCareerAchievementsFragmentContainer: () => null,
}))
jest.mock("../ArtistGenes", () => ({
  ArtistGenesFragmentContainer: () => null,
}))
jest.mock("sharify", () => ({
  data: { APP_URL: "https://www.artsy-test.net" },
}))

describe("ArtistCareerHighlights", () => {
  const { getWrapper } = setupTestWrapper<ArtistCareerHighlights_Test_Query>({
    Component: ArtistCareerHighlightsFragmentContainer,
    query: graphql`
      query ArtistCareerHighlights_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistCareerHighlights_artist
        }
      }
    `,
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
        biographyBlurb: { credit: false },
      }),
    })
    expect(
      wrapper.find("SelectedCareerAchievementsFragmentContainer").length
    ).toBe(1)
    expect(wrapper.text()).not.toContain("bio")
    expect(wrapper.text()).toContain("Related categories")
    expect(wrapper.find("ArtistGenesFragmentContainer").length).toBe(1)
  })

  it("renders partner bio when provided", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
        biographyBlurb: {
          credit: true,
          partner: {
            profile: {
              href: "/partnerID",
            },
          },
          text: "partnerBioText",
        },
      }),
    })
    expect(wrapper.text()).toContain("Bio")
    expect(wrapper.find("RouterLink").length).toBe(1)
    expect(wrapper.html()).toContain(
      'href="https://www.artsy-test.net/partnerID"'
    )
    expect(wrapper.text()).toContain("partnerBioText")
  })

  it("does not render categories if not provided", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        related: { genes: { edges: null } },
      }),
    })
    expect(wrapper.text()).not.toContain("Related categories")
  })
})
