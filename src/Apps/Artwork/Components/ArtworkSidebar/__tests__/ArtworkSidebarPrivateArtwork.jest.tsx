import { screen } from "@testing-library/react"
import { ArtworkSidebarPrivateArtwork } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPrivateArtwork"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebarPrivateArtworkQuery } from "__generated__/ArtworkSidebarPrivateArtworkQuery.graphql"

jest.unmock("react-relay")
jest.mock("System/Hooks/useFeatureFlag", () => {
  return {
    useFeatureFlag: jest.fn().mockReturnValue(true),
  }
})

describe("ArtworkSidebarPrivateArtwork", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ArtworkSidebarPrivateArtworkQuery
  >({
    Component: props => (
      <ArtworkSidebarPrivateArtwork artwork={props.artwork!} />
    ),
    query: graphql`
      query ArtworkSidebarPrivateArtworkQuery {
        artwork(id: "foo") {
          ...ArtworkSidebarPrivateArtwork_artwork
        }
      }
    `,
  })

  it("displays partner name", async () => {
    renderWithRelay({
      Partner: () => {
        return {
          name: "Commerce Test Partner",
        }
      },
      Artwork: () => {
        return {
          visibilityLevel: "UNLISTED",
        }
      },
    })
    expect(await screen.findByText("Commerce Test Partner")).toBeInTheDocument()
  })

  it("links to partner page", () => {
    renderWithRelay({
      Partner: () => {
        return {
          name: "Commerce Test Partner",
          slug: "commerce-test-partner",
        }
      },
      Artwork: () => {
        return {
          visibilityLevel: "UNLISTED",
        }
      },
    })

    const link = screen.getByRole("link", { name: /Commerce Test Partner/i })
    expect(link).toHaveAttribute("href", "/partner/commerce-test-partner")
  })
})
