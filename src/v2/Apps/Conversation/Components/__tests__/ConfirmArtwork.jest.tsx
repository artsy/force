import { ConfirmArtworkModalFragmentContainer } from "../ConfirmArtworkModal"
import { CollapsibleArtworkDetails } from "../CollapsibleArtworkDetails"
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
  Component: ConfirmArtworkModalFragmentContainer,
  query: graphql`
    query ConfirmArtworkModal_Test_Query {
      artwork(id: "xxx") {
        ...ConfirmArtworkModal_artwork
      }
    }
  `,
})

describe("ConfirmArtworkModal", () => {
  it("renders the correct artwork details", () => {
    const wrapper = getWrapper({
      Artwork: () => ({
        title: "Test Artwork",
      }),
    })

    expect(wrapper.find(CollapsibleArtworkDetails)).toHaveLength(1)
    expect(wrapper.find(CollapsibleArtworkDetails).text()).toContain(
      "Test Artwork"
    )
  })

  it("has expandable details and correctly parses labels", () => {
    const wrapper = getWrapper({
      Artwork: () => ({
        certificateOfAuthenticity: { details: "test" },
        dimensions: {
          in: "33 x 33 in",
          cm: "33 x 33 cm",
        },
      }),
    })
    // Expands collapse
    const details = wrapper.find(CollapsibleArtworkDetails)
    expect(details.text()).not.toContain("Certificate of Authenticity")
    wrapper.find("button").simulate("click")
    details.update()
    expect(details.text()).toContain("Certificate of Authenticity")
    expect(details.text()).toContain("33 x 33 in\n33 x 33 cm")
  })
})
