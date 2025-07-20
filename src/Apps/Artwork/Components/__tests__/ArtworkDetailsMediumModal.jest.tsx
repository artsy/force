import { screen } from "@testing-library/react"
import { ArtworkDetailsMediumModalFragmentContainer } from "Apps/Artwork/Components/ArtworkDetailsMediumModal"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtworkDetailsMediumModalTestQuery } from "__generated__/ArtworkDetailsMediumModalTestQuery.graphql"
import { graphql } from "react-relay"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<ArtworkDetailsMediumModalTestQuery>({
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
      query ArtworkDetailsMediumModalTestQuery @relay_test_operation {
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
