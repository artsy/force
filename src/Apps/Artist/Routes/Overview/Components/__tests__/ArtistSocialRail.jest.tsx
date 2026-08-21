import { fireEvent, screen } from "@testing-library/react"
import { ArtistSocialRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistSocialRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistSocialRailTestQuery } from "__generated__/ArtistSocialRailTestQuery.graphql"
import { graphql } from "react-relay"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.unmock("react-relay")

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

  it("renders nothing when there is no Instagram media", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [],
      }),
    })

    expect(screen.queryByText("Social")).not.toBeInTheDocument()
  })
})
