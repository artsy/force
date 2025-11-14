import { ArtistsIndexFragmentContainer } from "Apps/Artists/Routes/ArtistsIndex"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ArtistsIndexFragmentContainerTestQuery } from "__generated__/ArtistsIndexFragmentContainerTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<ArtistsIndexFragmentContainerTestQuery>({
    Component: props => (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <ArtistsIndexFragmentContainer {...props} />
      </MockBoot>
    ),
    query: graphql`
      query ArtistsIndexFragmentContainerTestQuery @relay_test_operation {
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
    renderWithRelay({
      OrderedSet: () => ({ name: "Featured Artists" }),
    })

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Featured Artists",
    )
  })
})
