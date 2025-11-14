import { ArtworkLightboxFragmentContainer } from "Apps/Artwork/Components/ArtworkLightbox"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkLightbox", () => {
  const setup = (
    passedProps: {
      activeIndex: number | null
      enableArtworkCaption?: boolean
    } = {
      activeIndex: 0,
      enableArtworkCaption: false,
    },
  ) => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: (props: any) => (
        <ArtworkLightboxFragmentContainer {...props} {...passedProps} />
      ),
      query: graphql`
        query ArtworkLightboxQuery {
          artwork(id: "foo") {
            ...ArtworkLightbox_artwork
          }
        }
      `,
    })
    return { renderWithRelay }
  }

  it("does not error out if activeIndex is undefined", () => {
    const { container } = setup({
      activeIndex: null,
      enableArtworkCaption: false,
    }).renderWithRelay()
    expect(container.firstChild).toBeFalsy()
  })

  it("renders correctly", () => {
    setup().renderWithRelay()
    expect(screen.getByTestId("artwork-lightbox-image")).toBeInTheDocument()
  })

  it("renders with artwork caption enabled", () => {
    setup({
      activeIndex: 0,
      enableArtworkCaption: true,
    }).renderWithRelay()
    expect(screen.getByTestId("artwork-lightbox-image")).toBeInTheDocument()
  })
})
