import { screen } from "@testing-library/react"
import { PrivateArtworkAboutArtist } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkAboutArtist"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { PrivateArtworkAboutArtistQuery } from "__generated__/PrivateArtworkAboutArtistQuery.graphql"

jest.unmock("react-relay")

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

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => {
        return {
          name: "Test Artist Name",
          biographyBlurb: { text: "Test Artist Biography" },
          formattedNationalityAndBirthday: "USA, 1990",
        }
      },
    })

    expect(screen.getByText("Test Artist Name")).toBeInTheDocument()
    expect(screen.getByText("USA, 1990")).toBeInTheDocument()
    expect(screen.getByText("Follow")).toBeInTheDocument()
    expect(screen.queryByText("Test Artist Biography")).toBeInTheDocument()
  })

  it("does not render if displayArtistBio is false", () => {
    renderWithRelay({
      Artwork: () => ({
        displayArtistBio: false,
      }),
      Artist: () => {
        return {
          name: "Test Artist Name",
          biographyBlurb: { text: "Test Artist Biography" },
          formattedNationalityAndBirthday: "USA, 1990",
        }
      },
    })

    expect(screen.queryByText("Test Artist Biography")).not.toBeInTheDocument()
  })
})
