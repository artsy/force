import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ViewInRoomFragmentContainer } from "../ViewInRoom"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ViewInRoomFragmentContainer,
  query: graphql`
    query ViewInRoom_Test_Query @relay_test_operation {
      artwork(id: "example") {
        ...ViewInRoom_artwork
      }
    }
  `,
})

describe("ViewInRoom", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artwork: () => ({ widthCm: 33, heightCm: 66 }),
      ResizedImageUrl: () => ({
        src: "example.jpg",
        srcSet: "example.jpg 1x",
      }),
    })

    expect(wrapper.html()).toContain(
      'src="example.jpg" srcset="example.jpg 1x"'
    )
  })
})
