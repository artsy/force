import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtistsRailFragmentContainer } from "Apps/Partner/Components/Overview/ArtistsRail"
import { ViewAllButton } from "Apps/Partner/Components/Overview/ViewAllButton"
import { PartnerArtistsQueryRenderer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistList/PartnerArtists"
import { PartnerArtistsCarouselRenderer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistsCarousel/PartnerArtistsCarousel"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ({ partner }: any) => {
    return <ArtistsRailFragmentContainer partner={partner} />
  },
  variables: {
    partnerId: "unit-london",
  },
  query: graphql`
    query ArtistsRail_Test_Query($partnerId: String!) @relay_test_operation {
      partner(id: $partnerId) @principalField {
        ...ArtistsRail_partner
      }
    }
  `,
})

describe("ArtistsRail", () => {
  it("renders artist list if partner not eligible for full profile", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        slug: "unit-london",
        profileArtistsLayout: "Grid",
        displayFullPartnerPage: false,
        artistsWithPublishedArtworks: {
          totalCount: 10,
        },
        representedArtistsWithoutPublishedArtworks: {
          totalCount: 0,
        },
      }),
    })

    expect(wrapper.find(PartnerArtistsQueryRenderer)).toHaveLength(1)
    expect(wrapper.find(ViewAllButton)).toHaveLength(0)
  })

  describe("renders carousel", () => {
    it("renders container correctly", () => {
      const { wrapper } = getWrapper({
        Partner: () => ({
          slug: "unit-london",
          profileArtistsLayout: "Grid",
          displayFullPartnerPage: true,
          artistsWithPublishedArtworks: {
            totalCount: 10,
          },
          representedArtistsWithoutPublishedArtworks: {
            totalCount: 0,
          },
        }),
      })

      expect(wrapper.find(PartnerArtistsCarouselRenderer)).toHaveLength(1)
    })

    it("doesn't render if no artists with published artworks", () => {
      const { wrapper } = getWrapper({
        Partner: () => ({
          slug: "unit-london",
          profileArtistsLayout: "Grid",
          displayFullPartnerPage: true,
          artistsWithPublishedArtworks: {
            totalCount: 0,
          },
          representedArtistsWithoutPublishedArtworks: {
            totalCount: 10,
          },
        }),
      })

      expect(wrapper.html()).toBeFalsy()
    })
  })

  describe("renders list", () => {
    it("renders container correctly", () => {
      const { wrapper } = getWrapper({
        Partner: () => ({
          slug: "unit-london",
          profileArtistsLayout: "List",
          displayFullPartnerPage: true,
          artistsWithPublishedArtworks: {
            totalCount: 10,
          },
          representedArtistsWithoutPublishedArtworks: {
            totalCount: 10,
          },
        }),
      })

      expect(wrapper.find(PartnerArtistsQueryRenderer)).toHaveLength(1)
    })

    it("doesn't render if no artists", () => {
      const { wrapper } = getWrapper({
        Partner: () => ({
          slug: "unit-london",
          profileArtistsLayout: "List",
          displayFullPartnerPage: true,
          artistsWithPublishedArtworks: {
            totalCount: 0,
          },
          representedArtistsWithoutPublishedArtworks: {
            totalCount: 0,
          },
        }),
      })

      expect(wrapper.html()).toBeFalsy()
    })
  })
})
