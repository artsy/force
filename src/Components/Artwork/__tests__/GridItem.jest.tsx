import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

import { GridItem_Test_Query } from "__generated__/GridItem_Test_Query.graphql"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"

jest.unmock("react-relay")
describe("GridItem", () => {
  const { renderWithRelay } = setupTestWrapperTL<GridItem_Test_Query>({
    Component: props => {
      if (props.artwork) {
        return <ArtworkGridItemFragmentContainer {...(props as any)} />
      }
      return null
    },
    query: graphql`
      query GridItem_Test_Query @relay_test_operation {
        artwork(id: "foo") {
          ...GridItem_artwork
        }
      }
    `,
  })

  it("navigates to the standard artwork page for standard artworks", async () => {
    renderWithRelay(mockResolvers)

    expect(screen.getByText("artwork-title")).toBeInTheDocument()

    expect(screen.getByTestId("artwork-link")).toHaveAttribute(
      "href",
      "artwork/id"
    )
  })

  it("navigates to my collection artwork page for my collection artworks", async () => {
    renderWithRelay(mockResolvers, {
      to: "/my-collection/artwork/artwork-id",
    })

    expect(screen.getByText("artwork-title")).toBeInTheDocument()

    expect(screen.getByTestId("artwork-link")).toHaveAttribute(
      "href",
      "/my-collection/artwork/artwork-id"
    )
  })

  it("renders exclusive access badge", async () => {
    renderWithRelay({
      Artwork: () => ({
        isUnlisted: true,
      }),
    })

    expect(screen.getByText("Exclusive Access")).toBeInTheDocument()
  })
})

const mockResolvers = {
  Artwork: () => ({
    title: "artwork-title",
    href: "artwork/id",
    image: { url: "image.url" },
    internalID: "artwork-id",
  }),
}
