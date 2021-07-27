import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ViewInRoomArtworkFragmentContainer } from "../ViewInRoomArtwork"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ViewInRoomArtworkFragmentContainer,
  query: graphql`
    query ViewInRoomArtwork_Test_Query {
      artwork(id: "example") {
        ...ViewInRoomArtwork_artwork
      }
    }
  `,
})

describe("ViewInRoomArtwork", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artwork: () => ({
        widthCm: 40,
        heightCm: 30,
      }),
    })

    expect(wrapper.html()).toContain(
      "width: 93.01181102362204px; height: 69.75885826771653px; margin-bottom: 301.77682086614175px;"
    )
  })
})
