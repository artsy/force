import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistCVRouteFragmentContainer } from "../ArtistCVRoute"
import { ArtistCVRoute_Test_Query } from "v2/__generated__/ArtistCVRoute_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("react-head", () => ({
  Title: () => null,
}))
jest.mock("v2/Components/Pagination", () => ({
  PaginationFragmentContainer: () => null,
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
      'Fair booths<mock-value-for-field-"startAt"><mock-value-for-field-"name">, <mock-value-for-field-"name">Load More'
    )
  })
})
