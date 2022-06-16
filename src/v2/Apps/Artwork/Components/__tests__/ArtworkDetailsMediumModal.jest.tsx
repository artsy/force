import { ArtworkDetailsMediumModalFragmentContainer } from "../ArtworkDetailsMediumModal"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    Modal: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ArtworkDetailsMediumModalFragmentContainer,
  query: graphql`
    query ArtworkDetailsMediumModal_Test_Query @relay_test_operation {
      artwork(id: "xxx") {
        ...ArtworkDetailsMediumModal_artwork
      }
    }
  `,
})

describe("ArtworkDetailsMediumModal", () => {
  it("renders the mediumType", () => {
    const wrapper = getWrapper({
      Artwork: () => ({
        mediumType: {
          longDescription:
            "Includes collages; drawings; figure drawing; pen and ink; sketch.",
        },
      }),
    })

    expect(wrapper.html()).toContain(
      "Includes collages; drawings; figure drawing; pen and ink; sketch."
    )
  })
})
