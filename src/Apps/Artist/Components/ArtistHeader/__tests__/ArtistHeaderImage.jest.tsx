import { screen } from "@testing-library/react"
import { useVariant } from "@unleash/proxy-client-react"
import { ArtistHeaderImageFragmentContainer } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderImage"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { getENV } from "Utils/getENV"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

const mockGetENV = getENV as jest.Mock // for mocking IS_MOBILE

jest.mock("@unleash/proxy-client-react", () => ({
  useVariant: jest.fn(() => ({
    enabled: true,
    name: "experiment",
  })),
}))

const mockUseVariant = useVariant as jest.Mock

jest.mock("System/Hooks/useTrackFeatureVariant", () => ({
  useTrackFeatureVariantOnMount: jest.fn(),
}))

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

  describe("diamond_artist-cover-artwork-experiment rendering", () => {
    describe("desktop", () => {
      beforeEach(() => {
        mockGetENV.mockReturnValue(false) // IS_MOBILE = false
      })

      it("renders experiment when enabled", () => {
        mockUseVariant.mockReturnValue({
          enabled: true,
          name: "experiment",
        })

        renderWithRelay({
          Artwork: () => mockCoverArtwork,
        })

        const experimentDiv = screen.getByText(/Artist tombstone TK on desktop/)
        expect(experimentDiv).toBeInTheDocument()
      })

      it("renders control otherwise", () => {
        mockUseVariant.mockReturnValue({
          enabled: true,
          name: "control",
        })

        renderWithRelay({
          Artwork: () => mockCoverArtwork,
        })

        const experimentDiv = screen.queryByText(
          /Artist tombstone TK on desktop/,
        )
        expect(experimentDiv).not.toBeInTheDocument()
      })
    })

    describe("mobile", () => {
      beforeEach(() => {
        mockGetENV.mockReturnValue(true) // IS_MOBILE = true
      })

      it("does not render experiment", () => {
        renderWithRelay({
          Artwork: () => mockCoverArtwork,
        })

        const experimentDiv = screen.queryByText(
          /Artist tombstone TK on desktop/,
        )
        expect(experimentDiv).not.toBeInTheDocument()
      })
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
