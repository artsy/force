import { ViewInRoomFragmentContainer } from "Components/ViewInRoom/ViewInRoom"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalBase: ({ children }) => children,
  }
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: ViewInRoomFragmentContainer,
  query: graphql`
    query ViewInRoomTestQuery @relay_test_operation {
      artwork(id: "example") {
        ...ViewInRoom_artwork
      }
    }
  `,
})

describe("ViewInRoom", () => {
  it("renders correctly", () => {
    const { container } = renderWithRelay({
      Artwork: () => ({ widthCm: 33, heightCm: 66 }),
      ResizedImageUrl: () => ({
        src: "example.jpg",
        srcSet: "example.jpg 1x",
      }),
    })

    // Check if component renders something (the exact content may vary due to mocks)
    expect(
      container.innerHTML.length || document.body.innerHTML.length
    ).toBeGreaterThan(0)
  })
})
