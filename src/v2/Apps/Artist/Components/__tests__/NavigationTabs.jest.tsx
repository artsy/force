import { NavigationTabs_Test_QueryRawResponse } from "v2/__generated__/NavigationTabs_Test_Query.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Artist/Components/NavigationTabs"
import { SystemContextProvider } from "v2/Artsy"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("v2/Components/RouteTabs")

describe("ArtistHeader", () => {
  const getWrapper = async (
    response: NavigationTabs_Test_QueryRawResponse["artist"] = NavigationTabsFixture,
    context = {}
  ) => {
    return await renderRelayTree({
      Component: ({ artist }: any) => {
        return (
          <SystemContextProvider {...context}>
            <NavigationTabs artist={artist} />
          </SystemContextProvider>
        )
      },
      query: graphql`
        query NavigationTabs_Test_Query @raw_response_type {
          artist(id: "pablo-picasso") {
            ...NavigationTabs_artist
          }
        }
      `,
      mockData: {
        artist: response,
      } as NavigationTabs_Test_QueryRawResponse,
    })
  }

  it("renders (or doesnt) the appropriate tabs based on the counts", async () => {
    const wrapper = await getWrapper({
      ...NavigationTabsFixture,
      counts: {
        forSaleArtworks: 12,
      },
    })
    const html = wrapper.html()
    expect(html).toContain("Works for sale")
    expect(html).toContain("/artist/andy-warhol/works-for-sale")
    expect(html).toContain("Auction results")
    expect(html).toContain("/artist/andy-warhol/auction-results")
    expect(html).toContain("Overview")
  })

  it("renders the count of forSaleWorks if greater than zero", async () => {
    const wrapper = await getWrapper({
      ...NavigationTabsFixture,
      counts: {
        forSaleArtworks: 12,
      },
    })
    const html = wrapper.html()
    expect(html).toContain("Works for sale (12)")
  })

  it("renders 'Artworks' instead of 'Works for sale' on tab if there are no works for sale", async () => {
    const wrapper = await getWrapper({
      ...NavigationTabsFixture,
      counts: {
        forSaleArtworks: 0,
      },
    })
    const html = wrapper.html()
    expect(html).not.toContain("Works for sale")
    expect(html).toContain("Artworks")
  })

  it("renders no tabs if there is no content", async () => {
    const wrapper = await getWrapper({
      ...NavigationTabsFixture,
      statuses: {
        auctionLots: false,
        cv: false,
        shows: false,
        articles: false,
        artworks: false,
      },
      biographyBlurb: null,
    })
    const html = wrapper.html()
    expect(html).toBeFalsy()
  })
})

const NavigationTabsFixture: NavigationTabs_Test_QueryRawResponse["artist"] = {
  id: "blah",
  slug: "andy-warhol",
  statuses: {
    auctionLots: true,
    cv: true,
    shows: true,
    articles: true,
    artworks: true,
  },
  counts: {
    forSaleArtworks: 0,
  },
  highlights: {
    partnersConnection: {
      edges: [],
    },
  },
  biographyBlurb: {
    text: "bio!",
  },
  insights: null,
  related: {
    genes: {
      edges: [],
    },
  },
}
