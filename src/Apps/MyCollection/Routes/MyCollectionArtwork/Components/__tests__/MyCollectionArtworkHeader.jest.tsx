import { MyCollectionArtworkHeaderTestQuery } from "__generated__/MyCollectionArtworkHeaderTestQuery.graphql"
import { MyCollectionArtworkHeader } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("MyCollectionArtworkHeader", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    MyCollectionArtworkHeaderTestQuery
  >({
    Component: props => {
      if (props?.artwork) {
        return <MyCollectionArtworkHeader {...(props as any)} />
      }
      return null
    },
    query: graphql`
      query MyCollectionArtworkHeaderTestQuery @relay_test_operation {
        artwork(id: "foo") {
          ...MyCollectionArtworkHeader_artwork
        }
      }
    `,
  })

  it("displays Edit Artwork Details CTA", () => {
    renderWithRelay({ Artwork: () => mockResolversWithoutSubmission })

    const editCTA = screen.getByText("Edit Artwork Details")
    expect(editCTA).toBeInTheDocument()

    expect(
      screen
        .getAllByRole("link")
        .find(c => c.textContent?.includes("Edit Artwork Details"))
    ).toHaveAttribute(
      "href",
      `/collector-profile/my-collection/artworks/artwork-id/edit`
    )
  })

  it("does not display Edit Artwork Details CTA", () => {
    renderWithRelay({ Artwork: () => mockResolversWithSubmission })

    expect(screen.queryByText("Edit Artwork Details")).not.toBeInTheDocument()
  })
})

const mockResolversWithSubmission = {
  internalID: "artwork-id",
  slug: "artwork-slug",
  consignmentSubmission: {
    internalID: "submission-id",
  },
}
const mockResolversWithoutSubmission = {
  internalID: "artwork-id",
  slug: "artwork-slug",
  consignmentSubmission: null,
}
