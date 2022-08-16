// test that images show up when there are images
// test that noimageicon show up when there are no images

import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { MyCollectionArtworkImageBrowserFragmentContainer } from "../MyCollectionArtworkImageBrowser"
import { MyCollectionArtworkImageBrowserTestQuery } from "__generated__/MyCollectionArtworkImageBrowserTestQuery.graphql"
import { screen } from "@testing-library/react"
import { MockBoot } from "DevTools"

jest.unmock("react-relay")

describe("MyCollectionArtworkImageBrowser", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    MyCollectionArtworkImageBrowserTestQuery
  >({
    Component: props => {
      return (
        <MockBoot>
          <MyCollectionArtworkImageBrowserFragmentContainer
            {...(props as any)}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query MyCollectionArtworkImageBrowserTestQuery @relay_test_operation {
        artwork(id: "artwork-id") {
          ...MyCollectionArtworkImageBrowser_artwork
        }
      }
    `,
  })

  describe("when there are images", () => {
    it("renders correctly", () => {
      renderWithRelay(
        {
          Artwork: () => ({
            images: [{ width: 800, height: 600 }],
            figures: [{ __typename: "Image" }],
          }),
          Image: () => ({ isDefault: true }),
          ResizedImageUrl: () => ({
            width: 800,
            height: 600,
            src: "image.jpg",
            srcSet: "image.jpg 1x",
          }),
        },
        false
      )

      expect(screen.getByTestId("artwork-lightbox-box")).toHaveStyle(
        "max-width: 800px"
      )

      expect(screen.getByTestId("artwork-lightbox-image")).toHaveAttribute(
        "src",
        "image.jpg"
      )
      expect(screen.getByTestId("artwork-lightbox-image")).toHaveAttribute(
        "srcset",
        "image.jpg 1x"
      )
    })
  })

  describe("when there are no images", () => {
    it("renders the empty state correctly", () => {
      renderWithRelay({ Artwork: () => ({ images: [], figures: [] }) }, false)

      expect(
        screen.getByTestId("my-collection-no-image-box")
      ).toBeInTheDocument()
    })
  })
})
