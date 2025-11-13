import { ArtworkImageBrowserLargeFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowserLarge"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ArtworkImageBrowserLargeTestQuery } from "__generated__/ArtworkImageBrowserLargeTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const { renderWithRelay } =
  setupTestWrapperTL<ArtworkImageBrowserLargeTestQuery>({
    Component: props => {
      if (!props.artwork) return null

      return (
        <MockBoot>
          <ArtworkImageBrowserLargeFragmentContainer
            artwork={props.artwork}
            maxHeight={800}
            activeIndex={0}
            onNext={jest.fn()}
            onPrev={jest.fn()}
            onChange={jest.fn()}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkImageBrowserLargeTestQuery @relay_test_operation {
        artwork(id: "example") {
          ...ArtworkImageBrowserLarge_artwork
        }
      }
    `,
  })

describe("ArtworkImageBrowserLarge", () => {
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
      "example.jpg"
    )
    expect(screen.getByTestId("artwork-lightbox-image")).toHaveAttribute(
      "srcset",
      "example.jpg 1x"
    )
  })
})
