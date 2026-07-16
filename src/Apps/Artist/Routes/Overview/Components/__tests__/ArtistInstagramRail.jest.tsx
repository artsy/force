import { screen } from "@testing-library/react"
import { ArtistInstagramRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistInstagramRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistInstagramRailTestQuery } from "__generated__/ArtistInstagramRailTestQuery.graphql"
import { graphql } from "react-relay"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<ArtistInstagramRailTestQuery>({
  Component: ArtistInstagramRailFragmentContainer,
  query: graphql`
    query ArtistInstagramRailTestQuery @relay_test_operation {
      artist(id: "test") {
        ...ArtistInstagramRail_artist
      }
    }
  `,
})

describe("ArtistInstagramRail", () => {
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

    expect(screen.getByText("Instagram")).toBeInTheDocument()

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

  it("does not render when there is no Instagram media", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        instagramMedia: [],
      }),
    })

    expect(container.firstChild).toBeNull()
  })
})
