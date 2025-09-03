import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowser"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtworkImageBrowserTestQuery } from "__generated__/ArtworkImageBrowserTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const mockUseCursor = jest.fn()
jest.mock("use-cursor", () => ({
  useCursor: (...args: any[]) => mockUseCursor(...args),
}))

const { renderWithRelay } = setupTestWrapperTL<ArtworkImageBrowserTestQuery>({
  Component: props => {
    if (!props.artwork) return null

    return (
      <MockBoot>
        <ArtworkImageBrowserFragmentContainer artwork={props.artwork} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtworkImageBrowserTestQuery @relay_test_operation {
      artwork(id: "example") {
        ...ArtworkImageBrowser_artwork
      }
    }
  `,
})

describe("ArtworkImageBrowser", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseCursor.mockReturnValue({
      index: 0,
      handleNext: jest.fn(),
      handlePrev: jest.fn(),
      setCursor: jest.fn(),
    })
  })

  describe("default image selection", () => {
    it("should initialize cursor with index of image marked isDefault: true", () => {
      renderWithRelay({
        Artwork: () => ({
          internalID: "test-artwork-id",
          figures: [
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: false,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: false,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: true,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: false,
              aspectRatio: 1.33,
            },
          ],
        }),
        ResizedImageUrl: () => ({
          width: 800,
          height: 600,
          src: "example.jpg",
          srcSet: "example.jpg 1x",
        }),
      })

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 4,
        initialCursor: 2,
      })
    })

    it("should fallback to index 0 when no image has isDefault: true", () => {
      renderWithRelay({
        Artwork: () => ({
          internalID: "test-artwork-id",
          figures: [
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: false,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: false,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: false,
              aspectRatio: 1.33,
            },
          ],
        }),
        ResizedImageUrl: () => ({
          width: 800,
          height: 600,
          src: "example.jpg",
          srcSet: "example.jpg 1x",
        }),
      })

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 3,
        initialCursor: 0,
      })
    })

    it("should fallback to index 0 when all images have isDefault: null", () => {
      renderWithRelay({
        Artwork: () => ({
          internalID: "test-artwork-id",
          figures: [
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: null,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: null,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: null,
              aspectRatio: 1.33,
            },
          ],
        }),
        ResizedImageUrl: () => ({
          width: 800,
          height: 600,
          src: "example.jpg",
          srcSet: "example.jpg 1x",
        }),
      })

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 3,
        initialCursor: 0,
      })
    })

    it("should handle mixed figure types and find default image", () => {
      renderWithRelay({
        Artwork: () => ({
          internalID: "test-artwork-id",
          figures: [
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: false,
              aspectRatio: 1.33,
            },
            {
              __typename: "Video",
              videoWidth: 800,
              videoHeight: 600,
              id: "video-id",
            },
            {
              __typename: "Image",
              width: 800,
              height: 600,
              isDefault: true,
              aspectRatio: 1.33,
            },
          ],
        }),
        ResizedImageUrl: () => ({
          width: 800,
          height: 600,
          src: "example.jpg",
          srcSet: "example.jpg 1x",
        }),
      })

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 3,
        initialCursor: 2,
      })
    })

    it("should handle empty figures array", () => {
      const { container } = renderWithRelay({
        Artwork: () => ({
          internalID: "test-artwork-id",
          figures: [],
        }),
      })

      expect(container.innerHTML).toBe("")
      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 0,
        initialCursor: 0,
      })
    })

    it("should select isDefault image when it is not the first image", () => {
      renderWithRelay({
        Artwork: () => ({
          internalID: "68b82b6a4b9eaf000fe97212",
          figures: [
            {
              __typename: "Image",
              width: 2300,
              height: 1732,
              isDefault: null,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 1304,
              height: 1732,
              isDefault: null,
              aspectRatio: 1.33,
            },
            {
              __typename: "Image",
              width: 148,
              height: 196,
              isDefault: true,
              aspectRatio: 1.33,
            },
          ],
        }),
        ResizedImageUrl: () => ({
          width: 800,
          height: 600,
          src: "example.jpg",
          srcSet: "example.jpg 1x",
        }),
      })

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 3,
        initialCursor: 2,
      })
    })
  })
})
