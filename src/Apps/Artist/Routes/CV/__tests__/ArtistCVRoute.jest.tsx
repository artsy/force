import { ArtistCVRouteFragmentContainer } from "Apps/Artist/Routes/CV/ArtistCVRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistCVRouteTestQuery } from "__generated__/ArtistCVRouteTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => null,
}))

describe("ArtistCVRoute", () => {
  const { renderWithRelay } = setupTestWrapperTL<ArtistCVRouteTestQuery>({
    Component: ArtistCVRouteFragmentContainer,
    query: graphql`
      query ArtistCVRouteTestQuery($artistID: String!) @relay_test_operation {
        viewer {
          ...ArtistCVRoute_viewer
        }
      }
    `,
    variables: {
      artistID: "artistID",
    },
  })

  it("renders a message with no show info", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        showsConnection: { edges: null },
      }),
    })
    expect(container.textContent).toMatch(/This artist has no/)
  })

  it("renders correctly", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        name: "artistName",
      }),
    })

    expect(container.textContent).toContain(
      'Fair booths<mock-value-for-field-"startAt"><mock-value-for-field-"name">, <mock-value-for-field-"name">',
    )
  })
})
