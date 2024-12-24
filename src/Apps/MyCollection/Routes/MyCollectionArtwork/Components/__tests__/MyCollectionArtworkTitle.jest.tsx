import { screen } from "@testing-library/react"
import { MyCollectionArtworkTitle } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkTitle"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { MyCollectionArtworkTitleTestQuery } from "__generated__/MyCollectionArtworkTitleTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("MyCollectionArtworkTitle", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<MyCollectionArtworkTitleTestQuery>({
      Component: props => {
        if (props?.artwork) {
          return <MyCollectionArtworkTitle {...(props as any)} />
        }
        return null
      },
      query: graphql`
        query MyCollectionArtworkTitleTestQuery @relay_test_operation {
          artwork(id: "foo") {
            ...MyCollectionArtworkTitle_artwork
          }
        }
      `,
    })

  beforeEach(() => {
    renderWithRelay({ Artwork: () => mockResolversWithData })
  })

  it("displays artists names and title with the artist url", () => {
    expect(screen.getByText("Jean-Michel Basquiat")).toBeInTheDocument()
    expect(screen.getByText("Jean-Michel Basquiat")).toHaveAttribute(
      "href",
      "/artist/artist-id",
    )

    expect(
      screen.getByText(
        "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)",
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(", 1979")).toBeInTheDocument()
  })
})

const mockResolversWithData = {
  artistNames: "Jean-Michel Basquiat",
  artist: {
    href: "/artist/artist-id",
  },
  title:
    "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)",
  date: "1979",
}
