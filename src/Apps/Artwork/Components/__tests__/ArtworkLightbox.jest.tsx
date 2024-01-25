import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtworkLightboxFragmentContainer } from "Apps/Artwork/Components/ArtworkLightbox"

jest.unmock("react-relay")

describe("ArtworkLightbox", () => {
  const setup = (
    passedProps: { activeIndex: number | null } = { activeIndex: 0 }
  ) => {
    const { getWrapper } = setupTestWrapper({
      Component: (props: any) => (
        <ArtworkLightboxFragmentContainer {...props} {...passedProps} />
      ),
      query: graphql`
        query ArtworkLightboxTestQuery {
          artwork(id: "foo") {
            ...ArtworkLightbox_artwork
          }
        }
      `,
    })
    return { getWrapper }
  }

  it("does not error out if activeIndex is undefined", () => {
    const { wrapper } = setup({ activeIndex: null }).getWrapper()
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const { wrapper } = setup().getWrapper()
    expect(wrapper.find("Image").length).toBeTruthy()
  })
})
