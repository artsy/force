import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtworkLightboxFragmentContainer } from "../ArtworkLightbox"

jest.unmock("react-relay")
jest.mock("react-head", () => ({
  Link: () => null,
}))

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
    const wrapper = setup({ activeIndex: null }).getWrapper()
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const wrapper = setup().getWrapper()
    expect(wrapper.find("Image").length).toBeTruthy()
  })
})
