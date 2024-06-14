import { screen } from "@testing-library/react"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { MyCollectionArtworkImageBrowserTestQuery } from "__generated__/MyCollectionArtworkImageBrowserTestQuery.graphql"
import { MyCollectionArtworkImageBrowserFragmentContainer } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkImageBrowser/MyCollectionArtworkImageBrowser"
import { useSystemContext } from "System/Hooks/useSystemContext"

jest.mock("System/Hooks/useSystemContext")
jest.unmock("react-relay")

describe("MyCollectionArtworkImageBrowser", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    MyCollectionArtworkImageBrowserTestQuery
  >({
    Component: (props: any) => {
      return (
        <MockBoot>
          <MyCollectionArtworkImageBrowserFragmentContainer {...props} />
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
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        user: {},
      }
    })
    it("renders correctly", () => {
      renderWithRelay({
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
      })

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
      it("renders the Upload Photo button", () => {
        renderWithRelay(
          {
            Artwork: () => ({
              images: [],
              figures: [],
              internalID: "artwork-x",
            }),
          },
          { isMyCollectionArtwork: true }
        )

        expect(screen.getByText("Upload Photos")).toBeInTheDocument()
        expect(screen.getByTestId("uploadPhotosButton")).toHaveAttribute(
          "href",
          "/collector-profile/my-collection/artworks/artwork-x/edit?step=photos"
        )
      })
    })

    describe("when the artwork is a normal artwork", () => {
      it("renders the empty state correctly", () => {
        renderWithRelay({ Artwork: () => ({ images: [], figures: [] }) })

        expect(
          screen.getByTestId("artwork-browser-no-image-box")
        ).toBeInTheDocument()
      })
    })
  })
})
