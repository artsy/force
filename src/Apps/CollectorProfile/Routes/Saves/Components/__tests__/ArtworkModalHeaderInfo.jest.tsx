import { render, screen } from "@testing-library/react"
import {
  ArtworkModalHeaderInfo,
  ArtworkModalHeaderInfoEntity,
} from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkModalHeaderInfo"

describe("ArtworkModalHeaderInfo", () => {
  it("should render artist names, artwork title and year", () => {
    render(<ArtworkModalHeaderInfo artwork={artworkEntity} />)

    expect(screen.getByText(/Banksy/)).toBeInTheDocument()
    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  it("should render artist names and artwork title", () => {
    render(
      <ArtworkModalHeaderInfo artwork={{ ...artworkEntity, year: null }} />
    )

    // Not displayed
    expect(screen.queryByText(/2023/)).not.toBeInTheDocument()

    expect(screen.getByText(/Banksy/)).toBeInTheDocument()
    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
  })

  it("should render artwork title and year", () => {
    render(
      <ArtworkModalHeaderInfo
        artwork={{ ...artworkEntity, artistNames: null }}
      />
    )

    // Not displayed
    expect(screen.queryByText(/Banksy/)).not.toBeInTheDocument()

    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  it("should render only artwork title", () => {
    render(
      <ArtworkModalHeaderInfo
        artwork={{ ...artworkEntity, artistNames: null, year: null }}
      />
    )

    // Not displayed
    expect(screen.queryByText(/Banksy/)).not.toBeInTheDocument()
    expect(screen.queryByText(/2023/)).not.toBeInTheDocument()

    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
  })

  describe("Artists", () => {
    it("should render `Artist Unavailable` when `artistNames` value is null", () => {
      render(
        <ArtworkModalHeaderInfo
          artwork={{ ...artworkEntity, artistNames: null }}
        />
      )

      expect(screen.getByText(/Artist Unavailable/)).toBeInTheDocument()
    })

    it("should render `Artist Unavailable` when `artistNames` value is empty string", () => {
      render(
        <ArtworkModalHeaderInfo
          artwork={{ ...artworkEntity, artistNames: "" }}
        />
      )

      expect(screen.getByText(/Artist Unavailable/)).toBeInTheDocument()
    })
  })
})

const artworkEntity: ArtworkModalHeaderInfoEntity = {
  artistNames: "Banksy",
  title: "Artwork Title",
  year: "2023",
  imageURL: null,
}
