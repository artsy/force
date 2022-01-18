import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistGenesFragmentContainer } from "../ArtistGenes"
import { ArtistGenes_Test_Query } from "v2/__generated__/ArtistGenes_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("sharify", () => ({
  data: { APP_URL: "https://www.artsy-test.net" },
}))

describe("ArtistGenes", () => {
  const { getWrapper } = setupTestWrapper<ArtistGenes_Test_Query>({
    Component: ArtistGenesFragmentContainer,
    query: graphql`
      query ArtistGenes_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistGenes_artist
        }
      }
    `,
  })

  it("does not render if no genes", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        related: { genes: { edges: null } },
      }),
    })

    expect(wrapper.html()).toBe("")
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        related: { genes: { edges: [{ node: { href: "/gene/href" } }] } },
      }),
    })
    expect(wrapper.find("RouterLink").length).toBe(1)
    expect(wrapper.find("RouterLink").props().to).toBe(
      "https://www.artsy-test.net/gene/href"
    )
    expect(wrapper.text()).toContain("name")
  })
})
