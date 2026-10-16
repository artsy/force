import { cleanup, render, screen } from "@testing-library/react"
import { ArtAssistantArtworkRail } from "Apps/ArtAssistant/Components/ArtAssistantArtworkRail"
import { ArtAssistantArtistRail } from "Apps/ArtAssistant/Components/ArtAssistantArtistRail"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("Utils/Hooks/useClientQuery")
jest.mock("Components/Artwork/ShelfArtwork", () => ({
  ShelfArtworkFragmentContainer: ({ artwork }) => {
    return <div>Artwork {artwork.internalID}</div>
  },
  ShelfArtworkPlaceholder: () => {
    return <div>Loading artwork</div>
  },
}))
jest.mock("Components/Cells/CellArtist", () => ({
  CellArtistFragmentContainer: ({ artist }) => {
    return <div>Artist {artist.internalID}</div>
  },
  CellArtistPlaceholder: () => {
    return <div>Loading artist</div>
  },
}))

describe("Art Assistant result rails", () => {
  it("restores the agent's artwork ranking", () => {
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: {
        artworksConnection: {
          edges: [
            { node: { internalID: "one" } },
            { node: { internalID: "two" } },
          ],
        },
      },
    })
    render(
      <MockBoot>
        <ArtAssistantArtworkRail ids={["two", "one"]} />
      </MockBoot>,
    )
    const cards = screen.getAllByText(/^Artwork /)
    expect(cards.map(card => card.textContent)).toEqual([
      "Artwork two",
      "Artwork one",
    ])
  })
  it("shows independent loading, error and empty states", () => {
    ;(useClientQuery as jest.Mock).mockReturnValue({ data: null })
    const { unmount } = render(
      <MockBoot>
        <ArtAssistantArtistRail ids={["one"]} />
      </MockBoot>,
    )
    expect(screen.getByLabelText("Loading artists")).toBeInTheDocument()
    ;(useClientQuery as jest.Mock).mockReturnValue({
      error: new Error("Unavailable"),
    })
    unmount()
    render(
      <MockBoot>
        <ArtAssistantArtistRail ids={["one"]} />
      </MockBoot>,
    )
    expect(
      screen.getByText("Artist suggestions are unavailable."),
    ).toBeInTheDocument()
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: { artistsConnection: { edges: [] } },
    })
    cleanup()
    render(
      <MockBoot>
        <ArtAssistantArtistRail ids={["one"]} />
      </MockBoot>,
    )
    expect(screen.getByText("No matching artists found.")).toBeInTheDocument()
  })
})
