import { screen } from "@testing-library/react"
import { ArtistHeaderImageFragmentContainer } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderImage"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { getENV } from "Utils/getENV"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

const mockGetENV = getENV as jest.Mock // for mocking IS_MOBILE

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistHeaderImageFragmentContainer,
  query: graphql`
    query ArtistHeaderImage_Test_Query @relay_test_operation {
      artwork(id: "example") {
        ...ArtistHeaderImage_artwork
      }
    }
  `,
})

describe("ArtistHeaderImage", () => {
  beforeEach(() => {
    mockGetENV.mockReset()
  })

  it("renders the image", () => {
    renderWithRelay({
      Artwork: () => mockCoverArtwork,
    })

    const img = screen.getByRole("img")
    expect(img).toBeInTheDocument()
  })

  it("renders imageTitle as alt text", () => {
    renderWithRelay({
      Artwork: () => mockCoverArtwork,
    })

    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("alt", "Guernica by Pablo Picasso")
  })

  it("renders fallback alt text", () => {
    renderWithRelay({
      Artwork: () => ({ ...mockCoverArtwork, imageTitle: null }),
    })

    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("alt", "Artwork by Pablo Picasso")
  })

  describe("when image data is missing", () => {
    it("renders nothing", () => {
      renderWithRelay({
        Artwork: () => ({
          image: null,
        }),
      })

      const img = screen.queryByRole("img")
      expect(img).not.toBeInTheDocument()
    })
  })

  describe("when image data is invalid", () => {
    it("renders nothing", () => {
      renderWithRelay({
        Artwork: () => ({
          image: {
            src: null,
            width: null,
            height: null,
          },
        }),
      })

      const img = screen.queryByRole("img")
      expect(img).not.toBeInTheDocument()
    })
  })
})

const mockCoverArtwork = {
  imageTitle: "Guernica by Pablo Picasso",
  image: {
    src: "https://example.com/image.jpg",
    width: 800,
    height: 600,
  },
  artist: { name: "Pablo Picasso" },
}
