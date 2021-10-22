import { graphql } from "react-relay"
import { ArtistsIndexFragmentContainer } from "../Routes/ArtistsIndex"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistsIndexFragmentContainer_Test_Query } from "v2/__generated__/ArtistsIndexFragmentContainer_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<
  ArtistsIndexFragmentContainer_Test_Query
>({
  Component: props => (
    <MockBoot>
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      <ArtistsIndexFragmentContainer {...props} />
    </MockBoot>
  ),
  query: graphql`
    query ArtistsIndexFragmentContainer_Test_Query {
      featuredArtists: orderedSets(key: "homepage:featured-artists") {
        ...ArtistsIndex_featuredArtists
      }
      featuredGenes: orderedSets(key: "artists:featured-genes") {
        ...ArtistsIndex_featuredGenes
      }
    }
  `,
})

describe("ArtistsIndex", () => {
  it("renders the page", () => {
    const wrapper = getWrapper({
      OrderedSet: () => ({ name: "Featured Artists" }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Featured Artists")
  })
})
