import { ArtworkDetailsMediumModalFragmentContainer } from "Apps/Artwork/Components/ArtworkDetailsMediumModal"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkDetailsMediumModal_Test_Query } from "__generated__/ArtworkDetailsMediumModal_Test_Query.graphql"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ArtworkDetailsMediumModal_Test_Query>({
  Component: props => {
    if (!props.artwork) return null

    return (
      <ArtworkDetailsMediumModalFragmentContainer
        artwork={props.artwork}
        onClose={jest.fn()}
        show
      />
    )
  },
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
    const { wrapper } = getWrapper({
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
