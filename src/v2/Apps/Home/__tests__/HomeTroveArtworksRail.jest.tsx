import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeTroveArtworksRailFragmentContainer } from "../Components/HomeTroveArtworksRail"
import { HomeTroveArtworksRail_Test_Query } from "v2/__generated__/HomeTroveArtworksRail_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeTroveArtworksRail_Test_Query>({
  Component: props => {
    return <HomeTroveArtworksRailFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeTroveArtworksRail_Test_Query @relay_test_operation {
      viewer {
        ...HomeTroveArtworksRail_viewer
      }
    }
  `,
})

describe("HomeTroveArtworksRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Viewer: () => ({
        saleArtworksConnection: {
          edges: [
            {
              node: {
                title: "Trove",
                href: "test-href",
                sale: {
                  isClosed: true,
                },
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Trove")
    expect(wrapper.text()).toContain(
      "A weekly curated selection of the best works on Artsy"
    )
    expect(wrapper.html()).toContain("test-href")
  })
})
