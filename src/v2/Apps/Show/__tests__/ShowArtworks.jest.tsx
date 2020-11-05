import React from "react"
import { ShowArtworksRefetchContainer } from "../Components/ShowArtworks"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ShowArtworks_Test_Query } from "v2/__generated__/ShowArtworks_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({ match: { location: { query: {} } } }),
}))

const { getWrapper } = setupTestWrapper<ShowArtworks_Test_Query>({
  Component: props => (
    <MockBoot>
      <ShowArtworksRefetchContainer {...props} />
    </MockBoot>
  ),
  query: graphql`
    query ShowArtworks_Test_Query {
      show(id: "catty-show") {
        ...ShowArtworks_show
      }
    }
  `,
})

describe("ShowArtworks", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("GridItem__ArtworkGridItem").length).toBe(1)
  })
})
