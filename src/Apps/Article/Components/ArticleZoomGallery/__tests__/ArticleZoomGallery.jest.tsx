import { ArticleZoomGalleryFragmentContainer } from "Apps/Article/Components/ArticleZoomGallery/ArticleZoomGallery"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalBase: ({ children }) => children,
  }
})

jest.mock("react-head", () => ({
  ...jest.requireActual("react-head"),
  Link: props => {
    return <div data-testid={props.imageSrcSet} />
  },
}))

jest.mock("Utils/resized", () => ({
  resized: (src, _options) => {
    return { src, srcSet: src }
  },
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticleZoomGalleryFragmentContainer,
  query: graphql`
    query ArticleZoomGallery_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleZoomGallery_article
      }
    }
  `,
})

describe("ArticleZoomGallery", () => {
  it("preloads the surrounding images", () => {
    renderWithRelay({
      ArticleSectionImageCollection: () => ({
        figures: [
          {
            __typename: "Artwork",
            id: "artwork-1", // Active
            formattedMetadata: "Example Image 1",
            image: { url: "artwork-1" },
          },
          {
            __typename: "Artwork",
            id: "artwork-2", // Preload
            image: { url: "artwork-2" },
          },
          {
            __typename: "Artwork",
            id: "artwork-3", // Don't preload
            image: { url: "artwork-3" },
          },
          {
            __typename: "Artwork",
            id: "artwork-4", // Preload
            image: { url: "artwork-4" },
          },
        ],
      }),
    })

    expect(screen.getAllByAltText("Example Image 1")[0]).toBeInTheDocument()
    expect(screen.getAllByTestId("artwork-4")[0]).toBeInTheDocument()
    expect(screen.getAllByTestId("artwork-2")[0]).toBeInTheDocument()
    expect(screen.queryAllByTestId("artwork-3")).toEqual([]) // Not in the document
  })
})
