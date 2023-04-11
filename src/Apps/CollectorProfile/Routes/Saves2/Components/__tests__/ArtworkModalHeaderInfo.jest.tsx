import { render, screen } from "@testing-library/react"
import {
  ArtworkModalHeaderInfo,
  ArtworkModalHeaderInfoEntity,
} from "Apps/CollectorProfile/Routes/Saves2/Components/ArtworkModalHeaderInfo"

describe("ArtworkModalHeaderInfo", () => {
  it("should render artists, artwork title and year", () => {
    render(<ArtworkModalHeaderInfo artwork={artworkEntity} />)

    expect(screen.getByText(/Banksy/)).toBeInTheDocument()
    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  it("should render artists and artwork title", () => {
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
      <ArtworkModalHeaderInfo artwork={{ ...artworkEntity, artists: null }} />
    )

    // Not displayed
    expect(screen.queryByText(/Banksy/)).not.toBeInTheDocument()

    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  it("should render only artwork title", () => {
    render(
      <ArtworkModalHeaderInfo
        artwork={{ ...artworkEntity, artists: null, year: null }}
      />
    )

    // Not displayed
    expect(screen.queryByText(/Banksy/)).not.toBeInTheDocument()
    expect(screen.queryByText(/2023/)).not.toBeInTheDocument()

    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
  })

  describe("Artists", () => {
    it("should render `Artist Unavailable` when `artists` value is null", () => {
      render(
        <ArtworkModalHeaderInfo artwork={{ ...artworkEntity, artists: null }} />
      )

      expect(screen.getByText(/Artist Unavailable/)).toBeInTheDocument()
    })

    it("should render `Artist Unavailable` when `artists` value is empty string", () => {
      render(
        <ArtworkModalHeaderInfo artwork={{ ...artworkEntity, artists: "" }} />
      )

      expect(screen.getByText(/Artist Unavailable/)).toBeInTheDocument()
    })
  })
})

const artworkEntity: ArtworkModalHeaderInfoEntity = {
  artists: "Banksy",
  title: "Artwork Title",
  year: "2023",
  imageURL: null,
}
