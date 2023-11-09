import { graphql } from "react-relay"
import { ArtistsIndexFragmentContainer } from "Apps/Artists/Routes/ArtistsIndex"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistsIndexFragmentContainer_Test_Query } from "__generated__/ArtistsIndexFragmentContainer_Test_Query.graphql"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<
  ArtistsIndexFragmentContainer_Test_Query
>({
  Component: props => (
    <MockBoot>
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ArtistsIndexFragmentContainer {...props} />
    </MockBoot>
  ),
  query: graphql`
    query ArtistsIndexFragmentContainer_Test_Query @relay_test_operation {
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
    const { wrapper } = getWrapper({
      OrderedSet: () => ({ name: "Featured Artists" }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Featured Artists")
  })
})
