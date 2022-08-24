import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { ArtworkImageBrowserTestQuery } from "__generated__/ArtworkImageBrowserTestQuery.graphql"
import { screen } from "@testing-library/react"
import { MockBoot } from "DevTools"
import { ArtworkImageBrowserFragmentContainer } from "../ArtworkImageBrowser"
import { useSystemContext } from "System/useSystemContext"

jest.unmock("react-relay")
jest.mock("System/useSystemContext")

describe("ArtworkImageBrowser", () => {
  const { renderWithRelay } = setupTestWrapperTL<ArtworkImageBrowserTestQuery>({
    Component: props => {
      return (
        <MockBoot>
          <ArtworkImageBrowserFragmentContainer {...(props as any)} />
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkImageBrowserTestQuery @relay_test_operation {
        artwork(id: "artwork-id") {
          ...ArtworkImageBrowser_artwork
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
    describe("when the artwork is a My Collection artwork", () => {
      // Enable my-collection-web-phase-3 feature flag
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        featureFlags: { "my-collection-web-phase-3": { flagEnabled: true } },
      }))

      it("renders the Upload Photo button", () => {
        renderWithRelay(
          { Artwork: () => ({ images: [], figures: [] }) },
          false,
          {
            isMyCollectionArtwork: true,
          }
        )

        expect(screen.getByText("Upload Photos")).toBeInTheDocument()
      })
    })

    describe("when the artwork is a normal artwork", () => {
      it("renders the empty state correctly", () => {
        renderWithRelay({ Artwork: () => ({ images: [], figures: [] }) }, false)

        expect(
          screen.getByTestId("artwork-browser-no-image-box")
        ).toBeInTheDocument()
      })
    })
  })
})
