import { render } from "@testing-library/react"
import { ArtworkImageBrowser } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowser"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("react-tracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const mockUseCursor = jest.fn()
jest.mock("use-cursor", () => ({
  useCursor: (...args: any[]) => mockUseCursor(...args),
}))

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
      const artwork = {
        internalID: "test-artwork-id",
        figures: [
          {
            __typename: "Image" as const,
            isDefault: false,
            width: 800,
            height: 600,
          },
          {
            __typename: "Image" as const,
            isDefault: false,
            width: 800,
            height: 600,
          },
          {
            __typename: "Image" as const,
            isDefault: true,
            width: 800,
            height: 600,
          },
          {
            __typename: "Image" as const,
            isDefault: false,
            width: 800,
            height: 600,
          },
        ],
      } as any

      render(
        <MockBoot>
          <ArtworkImageBrowser artwork={artwork} />
        </MockBoot>,
      )

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 4,
        initialCursor: 2,
      })
    })

    it("should fallback to index 0 when no image has isDefault: true", () => {
      const artwork = {
        internalID: "test-artwork-id",
        figures: [
          {
            __typename: "Image" as const,
            isDefault: false,
            width: 800,
            height: 600,
          },
          {
            __typename: "Image" as const,
            isDefault: false,
            width: 800,
            height: 600,
          },
          {
            __typename: "Image" as const,
            isDefault: false,
            width: 800,
            height: 600,
          },
        ],
      } as any

      render(
        <MockBoot>
          <ArtworkImageBrowser artwork={artwork} />
        </MockBoot>,
      )

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 3,
        initialCursor: 0,
      })
    })

    it("should fallback to index 0 when all images have isDefault: null", () => {
      const artwork = {
        internalID: "test-artwork-id",
        figures: [
          {
            __typename: "Image" as const,
            isDefault: null,
            width: 800,
            height: 600,
          },
          {
            __typename: "Image" as const,
            isDefault: null,
            width: 800,
            height: 600,
          },
          {
            __typename: "Image" as const,
            isDefault: null,
            width: 800,
            height: 600,
          },
        ],
      } as any

      render(
        <MockBoot>
          <ArtworkImageBrowser artwork={artwork} />
        </MockBoot>,
      )

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 3,
        initialCursor: 0,
      })
    })

    it("should handle mixed figure types and find default image", () => {
      const artwork = {
        internalID: "test-artwork-id",
        figures: [
          {
            __typename: "Image" as const,
            isDefault: false,
            width: 800,
            height: 600,
          },
          { __typename: "Video" as const, videoWidth: 800, videoHeight: 600 },
          {
            __typename: "Image" as const,
            isDefault: true,
            width: 800,
            height: 600,
          },
        ],
      } as any

      render(
        <MockBoot>
          <ArtworkImageBrowser artwork={artwork} />
        </MockBoot>,
      )

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 3,
        initialCursor: 2,
      })
    })

    it("should handle empty figures array", () => {
      const artwork = {
        internalID: "test-artwork-id",
        figures: [],
      } as any

      const { container } = render(
        <MockBoot>
          <ArtworkImageBrowser artwork={artwork} />
        </MockBoot>,
      )

      expect(container.innerHTML).toBe("")
      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 0,
        initialCursor: 0,
      })
    })

    it("should select isDefault image when it is not the first image", () => {
      const artwork = {
        internalID: "68b82b6a4b9eaf000fe97212",
        figures: [
          {
            __typename: "Image" as const,
            isDefault: null,
            width: 2300,
            height: 1732,
          },
          {
            __typename: "Image" as const,
            isDefault: null,
            width: 1304,
            height: 1732,
          },
          {
            __typename: "Image" as const,
            isDefault: true,
            width: 148,
            height: 196,
          },
        ],
      } as any

      render(
        <MockBoot>
          <ArtworkImageBrowser artwork={artwork} />
        </MockBoot>,
      )

      expect(mockUseCursor).toHaveBeenCalledWith({
        max: 3,
        initialCursor: 2,
      })
    })
  })
})
