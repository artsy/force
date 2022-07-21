import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistCVRouteFragmentContainer } from "../ArtistCVRoute"
import { ArtistCVRoute_Test_Query } from "__generated__/ArtistCVRoute_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => null,
}))

describe("ArtistCVRoute", () => {
  const { getWrapper } = setupTestWrapper<ArtistCVRoute_Test_Query>({
    Component: ArtistCVRouteFragmentContainer,
    query: graphql`
      query ArtistCVRoute_Test_Query($artistID: String!) @relay_test_operation {
        viewer {
          ...ArtistCVRoute_viewer
        }
      }
    `,
    variables: {
      artistID: "artistID",
    },
  })

  it("does not render rail if no shows", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        showsConnection: { edges: null },
      }),
    })
    expect(wrapper.find('[data-test="artistCVGroup"]').length).toBe(0)
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        name: "artistName",
      }),
    })

    const text = wrapper.text()

    expect(text).toContain(
      'Fair booths<mock-value-for-field-"startAt"><mock-value-for-field-"name">, <mock-value-for-field-"name">'
    )
  })
})
