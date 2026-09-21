import { fireEvent, screen } from "@testing-library/react"
import { ArtistSocialRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistSocialRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistSocialRailTestQuery } from "__generated__/ArtistSocialRailTestQuery.graphql"
import { graphql } from "react-relay"

const loggerError = jest.fn()

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/logger", () => ({
  __esModule: true,
  default: () => ({
    log: jest.fn(),
    warn: jest.fn(),
    // Deferred so `loggerError` is initialised by the time a test calls it.
    error: (...args: unknown[]) => loggerError(...args),
  }),
}))
jest.unmock("react-relay")

const GEMINI_SRC =
  "https://d196wkiy8qx2u5.cloudfront.net?height=375&quality=85&resize_to=fill&src=https%3A%2F%2Fscontent-iad3-1.cdninstagram.com%2Fv%2Ffirst.jpg%3Foe%3D6AAF2200&width=300"

const { renderWithRelay } = setupTestWrapperTL<ArtistSocialRailTestQuery>({
  Component: ArtistSocialRailFragmentContainer,
  query: graphql`
    query ArtistSocialRailTestQuery @relay_test_operation {
      artist(id: "test") {
        ...ArtistSocialRail_artist
      }
    }
  `,
})

describe("ArtistSocialRail", () => {
  beforeEach(() => {
    loggerError.mockClear()
  })

  it("renders the header and image tiles that link to each Instagram post", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [
          {
            internalID: "media-1",
            permalink: "https://www.instagram.com/p/first",
            caption: "First post",
            image: {
              cropped: {
                src: "https://example.com/1.jpg",
                srcSet: "https://example.com/1.jpg 1x",
              },
            },
          },
          {
            internalID: "media-2",
            permalink: "https://www.instagram.com/p/second",
            caption: "Second post",
            image: {
              cropped: {
                src: "https://example.com/2.jpg",
                srcSet: "https://example.com/2.jpg 1x",
              },
            },
          },
        ],
      }),
    })

    expect(screen.getByText("Social")).toBeInTheDocument()

    const first = screen.getByAltText("First post")
    const second = screen.getByAltText("Second post")
    expect(first.closest("a")).toHaveAttribute(
      "href",
      "https://www.instagram.com/p/first",
    )
    expect(second.closest("a")).toHaveAttribute(
      "href",
      "https://www.instagram.com/p/second",
    )

    expect(
      screen.queryByText(
        "We’ll update this area when more information is available.",
      ),
    ).not.toBeInTheDocument()
  })

  it("renders a skeleton behind each tile until its image loads", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [
          {
            internalID: "media-1",
            permalink: "https://www.instagram.com/p/first",
            caption: "First post",
            image: {
              cropped: {
                src: "https://example.com/1.jpg",
                srcSet: "https://example.com/1.jpg 1x",
              },
            },
          },
        ],
      }),
    })

    expect(screen.getByTestId("tile-skeleton")).toBeInTheDocument()

    fireEvent.load(screen.getByAltText("First post"))

    expect(screen.queryByTestId("tile-skeleton")).not.toBeInTheDocument()
  })

  it("reports a broken tile", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [
          {
            internalID: "media-1",
            permalink: "https://www.instagram.com/p/first",
            caption: "First post",
            image: { cropped: { src: GEMINI_SRC, srcSet: null } },
          },
        ],
      }),
    })

    fireEvent.error(screen.getByAltText("First post"))

    expect(loggerError).toHaveBeenCalledTimes(1)

    const [error] = loggerError.mock.calls[0]
    expect(error.message).toEqual(
      "[ArtistSocialRail] Gemini image failed to load",
    )
    expect(error.metadata).toEqual({
      instagramPostId: "media-1",
      src: GEMINI_SRC,
    })

    // The skeleton still clears so a broken tile does not spin forever.
    expect(screen.queryByTestId("tile-skeleton")).not.toBeInTheDocument()
  })

  it("does not report anything when a tile loads successfully", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [
          {
            internalID: "media-1",
            permalink: "https://www.instagram.com/p/first",
            caption: "First post",
            image: { cropped: { src: GEMINI_SRC, srcSet: null } },
          },
        ],
      }),
    })

    fireEvent.load(screen.getByAltText("First post"))

    expect(loggerError).not.toHaveBeenCalled()
  })

  it("renders the empty state when there is no Instagram media", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [],
      }),
    })

    expect(screen.getByText("Social")).toBeInTheDocument()
    expect(
      screen.getByText("We’ll update this area when new posts are available."),
    ).toBeInTheDocument()
    expect(screen.queryByText("Become a partner.")).not.toBeInTheDocument()
  })
})
