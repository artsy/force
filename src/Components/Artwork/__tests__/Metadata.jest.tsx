import { screen } from "@testing-library/react"
import Metadata from "Components/Artwork/Metadata"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { MetadataTestQuery } from "__generated__/MetadataTestQuery.graphql"

jest.unmock("react-relay")

describe("Metadata", () => {
  const { renderWithRelay } = setupTestWrapperTL<MetadataTestQuery>({
    Component: props => {
      if (props.artwork) {
        return <Metadata {...(props as any)} />
      }
      return null
    },
    query: graphql`
      query MetadataTestQuery @relay_test_operation {
        artwork(id: "artwork-id") {
          ...Metadata_artwork
        }
      }
    `,
  })

  it("navigates to artwork page when clicking on a normal artwork", () => {
    renderWithRelay(mockResolver)

    expect(screen.getByText("artwork title")).toBeInTheDocument()

    expect(screen.getByTestId("metadata-artwork-link")).toHaveAttribute(
      "href",
      "artwork/artwork-id"
    )
  })

  it("navigates to my collection artwork page when clicking on a my collection artwork", () => {
    renderWithRelay(mockResolver, {
      to: "/my-collection/artwork/artwork-id",
    })

    expect(screen.getByText("artwork title")).toBeInTheDocument()

    expect(screen.getByTestId("metadata-artwork-link")).toHaveAttribute(
      "href",
      "/my-collection/artwork/artwork-id"
    )
  })

  it("navigates to my collection artwork page when clicking on a my collection artwork when ff enabled", () => {
    renderWithRelay(mockResolver, {
      to: "/collector-profile/my-collection/artwork/artwork-id",
    })

    expect(screen.getByText("artwork title")).toBeInTheDocument()

    expect(screen.getByTestId("metadata-artwork-link")).toHaveAttribute(
      "href",
      "/collector-profile/my-collection/artwork/artwork-id"
    )
  })
})

const mockResolver = {
  Artwork: () => ({
    title: "artwork title",
    href: "artwork/artwork-id",
    internalID: "artwork-id",
  }),
}
