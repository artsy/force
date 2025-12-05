import { screen } from "@testing-library/react"
import { MyCollectionArtworkHeader } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { MyCollectionArtworkHeaderTestQuery } from "__generated__/MyCollectionArtworkHeaderTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("MyCollectionArtworkHeader", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<MyCollectionArtworkHeaderTestQuery>({
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
    // Get closest link
    expect(editCTA.closest("a")).toHaveAttribute(
      "href",
      "/collector-profile/my-collection/artworks/artwork-id/edit",
    )
  })

  it("displays Edit Artwork Details CTA even for submitted works", () => {
    renderWithRelay({ Artwork: () => mockResolversWithSubmission })

    expect(screen.queryByText("Edit Artwork Details")).toBeInTheDocument()
  })

  describe("ownership-based edit button visibility", () => {
    it("shows edit button when user owns the artwork (isSavedToList: true)", () => {
      renderWithRelay({
        Artwork: () => ({
          ...mockResolversWithoutSubmission,
          isSavedToList: true,
        }),
      })

      const editButton = screen.getByText("Edit Artwork Details")
      expect(editButton).toBeInTheDocument()
      expect(editButton.closest("a")).toHaveAttribute(
        "href",
        "/collector-profile/my-collection/artworks/artwork-id/edit",
      )
    })

    it("hides edit button when user does not own the artwork (isSavedToList: false)", () => {
      renderWithRelay({
        Artwork: () => ({
          ...mockResolversWithoutSubmission,
          isSavedToList: false,
        }),
      })

      expect(screen.queryByText("Edit Artwork Details")).not.toBeInTheDocument()
    })

    it("hides edit button when isSavedToList is null/undefined", () => {
      renderWithRelay({
        Artwork: () => ({
          ...mockResolversWithoutSubmission,
          isSavedToList: null,
        }),
      })

      expect(screen.queryByText("Edit Artwork Details")).not.toBeInTheDocument()
    })

    it("shows edit button for artwork owner even with submission", () => {
      renderWithRelay({
        Artwork: () => ({
          ...mockResolversWithSubmission,
          isSavedToList: true,
        }),
      })

      expect(screen.getByText("Edit Artwork Details")).toBeInTheDocument()
    })

    it("hides edit button for non-owner even with submission", () => {
      renderWithRelay({
        Artwork: () => ({
          ...mockResolversWithSubmission,
          isSavedToList: false,
        }),
      })

      expect(screen.queryByText("Edit Artwork Details")).not.toBeInTheDocument()
    })
  })
})

const mockResolversWithSubmission = {
  internalID: "artwork-id",
  slug: "artwork-slug",
  isSavedToList: true,
  consignmentSubmission: {
    internalID: "submission-id",
  },
}
const mockResolversWithoutSubmission = {
  internalID: "artwork-id",
  slug: "artwork-slug",
  isSavedToList: true,
  consignmentSubmission: null,
}
