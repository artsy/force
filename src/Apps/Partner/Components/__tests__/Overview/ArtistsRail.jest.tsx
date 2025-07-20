import { ArtistsRailFragmentContainer } from "Apps/Partner/Components/Overview/ArtistsRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ({ partner }: any) => {
    return <ArtistsRailFragmentContainer partner={partner} />
  },
  variables: {
    partnerId: "unit-london",
  },
  query: graphql`
    query ArtistsRailTestQuery($partnerId: String!) @relay_test_operation {
      partner(id: $partnerId) @principalField {
        ...ArtistsRail_partner
      }
    }
  `,
})

describe("ArtistsRail", () => {
  it("renders artist list if partner not eligible for full profile", () => {
    const { container } = renderWithRelay({
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

    // Check that some artist content is rendered (the specific component renders some list)
    expect(container.firstChild).toBeTruthy()
    // ViewAllButton should not be present for non-full partner pages
    expect(screen.queryByText("View all")).not.toBeInTheDocument()
  })

  describe("renders carousel", () => {
    it("renders container correctly", () => {
      const { container } = renderWithRelay({
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

      // Check that the carousel container is rendered
      expect(container.firstChild).toBeTruthy()
    })

    it("doesn't render if no artists with published artworks", () => {
      const { container } = renderWithRelay({
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

      expect(container.firstChild).toBeNull()
    })
  })

  describe("renders list", () => {
    it("renders container correctly", () => {
      const { container } = renderWithRelay({
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

      // Check that the list container is rendered
      expect(container.firstChild).toBeTruthy()
    })

    it("doesn't render if no artists", () => {
      const { container } = renderWithRelay({
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

      expect(container.firstChild).toBeNull()
    })
  })
})
