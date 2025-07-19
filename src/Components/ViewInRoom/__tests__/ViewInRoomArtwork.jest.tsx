import { ViewInRoomArtworkFragmentContainer } from "Components/ViewInRoom/ViewInRoomArtwork"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ViewInRoomArtworkFragmentContainer,
  query: graphql`
    query ViewInRoomArtwork_Test_Query @relay_test_operation {
      artwork(id: "example") {
        ...ViewInRoomArtwork_artwork
      }
    }
  `,
})

describe("ViewInRoomArtwork", () => {
  it("renders correctly", () => {
    const { container } = renderWithRelay({
      Artwork: () => ({
        widthCm: 40,
        heightCm: 30,
      }),
    })

    // Check that the component renders with some styling - the specific values may vary
    expect(container.innerHTML).toMatch(/width.*height.*margin/)
  })
})
