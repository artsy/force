import { screen } from "@testing-library/react"
import { ArtworkImageBrowserSmallFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowserSmall"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtworkImageBrowserSmallTestQuery } from "__generated__/ArtworkImageBrowserSmallTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const { renderWithRelay } =
  setupTestWrapperTL<ArtworkImageBrowserSmallTestQuery>({
    Component: props => {
      if (!props.artwork) return null

      return (
        <MockBoot>
          <ArtworkImageBrowserSmallFragmentContainer
            artwork={props.artwork}
            maxHeight={800}
            activeIndex={0}
            setActiveIndex={jest.fn()}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkImageBrowserSmallTestQuery @relay_test_operation {
        artwork(id: "example") {
          ...ArtworkImageBrowserSmall_artwork
        }
      }
    `,
  })

describe("ArtworkImageBrowserSmall", () => {
  it("renders correctly", () => {
    const { container } = renderWithRelay({
      Artwork: () => ({
        figures: [{ __typename: "Image" }],
      }),
      Image: () => ({ isDefault: true }),
      ResizedImageUrl: () => ({
        width: 800,
        height: 600,
        src: "example.jpg",
        srcSet: "example.jpg 1x",
      }),
    })

    expect(container.innerHTML).toContain("max-width: 800px")
    expect(screen.getByTestId("artwork-lightbox-image")).toHaveAttribute(
      "src",
      "example.jpg",
    )
    expect(screen.getByTestId("artwork-lightbox-image")).toHaveAttribute(
      "srcset",
      "example.jpg 1x",
    )
  })
})
