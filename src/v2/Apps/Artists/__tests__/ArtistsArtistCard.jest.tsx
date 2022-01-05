import { graphql } from "react-relay"
import { ArtistsArtistCardFragmentContainer } from "../Components/ArtistsArtistCard"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistsArtistCard_Test_Query } from "v2/__generated__/ArtistsArtistCard_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ArtistsArtistCard_Test_Query>({
  Component: ArtistsArtistCardFragmentContainer,
  query: graphql`
    query ArtistsArtistCard_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistsArtistCard_artist
      }
    }
  `,
})

describe("ArtistsArtistCard", () => {
  it("renders the counts correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        counts: {
          artworks: 10,
          forSaleArtworks: 5,
        },
      }),
    })

    expect(wrapper.html()).toContain(">10 works, 5 for sale<")
  })

  it("renders the counts correctly (2)", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        counts: {
          artworks: 10,
          forSaleArtworks: 10,
        },
      }),
    })

    expect(wrapper.html()).toContain(">10 works<")
  })

  it("renders the counts correctly with a single work", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        counts: {
          artworks: 1,
          forSaleArtworks: 0,
        },
      }),
    })

    expect(wrapper.html()).toContain(">1 work<")
  })

  it("renders the counts correctly with a single for sale work", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        counts: {
          artworks: 1,
          forSaleArtworks: 1,
        },
      }),
    })

    expect(wrapper.html()).toContain(">1 work<")
  })
})
