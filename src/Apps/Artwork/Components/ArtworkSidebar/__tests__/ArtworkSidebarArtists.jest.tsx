import {
  CulturalMakerWork,
  MultipleArtists,
  SingleFollowedArtist,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarArtistsFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { SystemContextProvider } from "System"
import { graphql } from "react-relay"
import { mockLocation } from "DevTools/mockLocation"
import { mediator } from "Server/mediator"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen, within } from "@testing-library/react"

jest.unmock("react-relay")

describe("ArtworkSidebarArtists", () => {
  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  beforeAll(() => {
    jest.spyOn(mediator, "trigger")
    mockLocation()
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ artwork }: any) => {
      return (
        <SystemContextProvider>
          <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />
        </SystemContextProvider>
      )
    },
    query: graphql`
      query ArtworkSidebarArtists_Test_Query @raw_response_type {
        artwork(id: "josef-albers-homage-to-the-square-85") {
          ...ArtworkSidebarArtists_artwork
        }
      }
    `,
  })

  describe("ArtworkSidebarArtists with one artist", () => {
    it("displays artist name for single artist", () => {
      renderWithRelay({
        Artwork: () => SingleFollowedArtist,
      })

      expect(screen.getByText("Josef Albers")).toBeInTheDocument()
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "/artist/josef-albers"
      )
    })

    it("renders artist follow button for single artist", () => {
      renderWithRelay({
        Artwork: () => SingleFollowedArtist,
      })

      const button = screen.getByRole("button")
      expect(within(button).getByText("Follow")).toBeInTheDocument()
      expect(within(button).getByText("Following")).toHaveStyle("opacity: 0")
    })
  })

  describe("ArtworkSidebarArtists with multiple artists", () => {
    it("displays artist names for multiple artists", () => {
      renderWithRelay({
        Artwork: () => MultipleArtists,
      })

      const links = screen.getAllByRole("link")

      expect(screen.getByText("Josef Albers")).toBeInTheDocument()
      expect(links[0]).toHaveAttribute("href", "/artist/josef-albers")

      expect(screen.getAllByText("Follow")).toHaveLength(2)
      expect(screen.getAllByText("Following")[0]).toHaveStyle("opacity: 0")

      expect(screen.getByText("Ed Ruscha")).toBeInTheDocument()
      expect(links[1]).toHaveAttribute("href", "/artist/ed-ruscha")
      expect(screen.getAllByText("Following")[1]).toHaveStyle("opacity: 0")
    })
  })

  describe("ArtworkSidebarArtists with cultural maker work", () => {
    it("displays cultural maker", () => {
      renderWithRelay({
        Artwork: () => CulturalMakerWork,
      })

      expect(screen.getByText("American 18th Century")).toBeInTheDocument()
    })
  })
})
