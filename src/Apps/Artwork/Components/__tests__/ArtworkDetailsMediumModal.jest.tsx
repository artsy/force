import { screen } from "@testing-library/react"
import { ArtworkDetailsMediumModalFragmentContainer } from "Apps/Artwork/Components/ArtworkDetailsMediumModal"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtworkDetailsMediumModal_Test_Query } from "__generated__/ArtworkDetailsMediumModal_Test_Query.graphql"
import { graphql } from "react-relay"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<ArtworkDetailsMediumModal_Test_Query>({
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
    renderWithRelay({
      Artwork: () => ({
        mediumType: {
          longDescription:
            "Includes collages; drawings; figure drawing; pen and ink; sketch.",
        },
      }),
    })

    expect(
      screen.getByText(
        "Includes collages; drawings; figure drawing; pen and ink; sketch.",
      ),
    ).toBeInTheDocument()
  })
})
