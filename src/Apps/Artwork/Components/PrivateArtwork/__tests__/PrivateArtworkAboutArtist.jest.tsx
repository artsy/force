import { screen } from "@testing-library/react"
import { PrivateArtworkAboutArtist } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkAboutArtist"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { PrivateArtworkAboutArtistQuery } from "__generated__/PrivateArtworkAboutArtistQuery.graphql"

jest.unmock("react-relay")
jest.mock("System/useFeatureFlag", () => {
  return {
    useFeatureFlag: jest.fn().mockReturnValue(true),
  }
})

describe("ArtworkSidebarPrivateArtwork", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    PrivateArtworkAboutArtistQuery
  >({
    Component: props => <PrivateArtworkAboutArtist artwork={props.artwork!} />,
    query: graphql`
      query PrivateArtworkAboutArtistQuery {
        artwork(id: "foo") {
          ...PrivateArtworkAboutArtist_artwork
        }
      }
    `,
  })

  it("displays artist name", async () => {
    renderWithRelay({
      Artist: () => {
        return {
          name: "Test Artist Name",
        }
      },
      Artwork: () => {
        return {
          visibilityLevel: "UNLISTED",
        }
      },
    })
    expect(await screen.findByText("Test Artist Name")).toBeInTheDocument()
  })

  it("displays artist bio when artist bio is present", () => {
    renderWithRelay({
      Artist: () => {
        return {
          biographyBlurb: { text: "Test Artist Biography" },
        }
      },
      Artwork: () => {
        return {
          visibilityLevel: "UNLISTED",
        }
      },
    })
    const biographyElement = screen.queryByText("Test Artist Biography")
    expect(biographyElement).toBeInTheDocument()
  })

  it("does not display artist bio when artist bio is not present", async () => {
    renderWithRelay({
      Artist: () => {
        return {
          biographyBlurb: null,
        }
      },
      Artwork: () => {
        return {
          visibilityLevel: "UNLISTED",
        }
      },
    })
    const biographyElement = screen.queryByText("Test Artist Biography")
    expect(biographyElement).not.toBeInTheDocument()
  })
})
