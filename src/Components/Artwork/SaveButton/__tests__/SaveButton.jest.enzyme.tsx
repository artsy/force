import { ContextModule } from "@artsy/cohesion"
import { SaveButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveButton"
import { useAuthDialog } from "Components/AuthDialog/useAuthDialog"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import type { SaveButtonTestQuery } from "__generated__/SaveButtonTestQuery.graphql"

jest.unmock("react-relay")

jest.mock("Components/AuthDialog/useAuthDialog")

describe("SaveButton", () => {
  const mockUseAuthDialog = useAuthDialog as jest.Mock

  const { getWrapper } = setupTestWrapper<SaveButtonTestQuery>({
    Component: props => (
      <SaveButtonFragmentContainer
        artwork={props.artwork as any}
        contextModule={ContextModule.artworkGrid}
      />
    ),
    query: graphql`
      query SaveButtonTestQuery {
        artwork(id: "gerhard-richter-bagdad-ii-flow-p10-1") {
          ...SaveButton_artwork
        }
      }
    `,
  })

  beforeEach(() => {
    mockUseAuthDialog.mockImplementation(() => ({
      showAuthDialog: jest.fn(),
    }))
  })

  it("should pass correct analytics data to the auth modal when save button is pressed and user is not logged in", async () => {
    const showAuthDialog = jest.fn()

    mockUseAuthDialog.mockImplementation(() => ({
      showAuthDialog,
    }))

    const { wrapper } = getWrapper({
      Artwork: () => ({
        internalID: "opaque-internal-id",
      }),
    })

    wrapper.find("button[data-test='saveButton']").simulate("click")

    expect(showAuthDialog.mock.calls[0]).toEqual([
      {
        analytics: { contextModule: "artworkGrid", intent: "saveArtwork" },
        options: {
          afterAuthAction: {
            action: "save",
            kind: "artworks",
            objectId: "opaque-internal-id",
          },
          title: "Sign up or log in to save artworks",
        },
      },
    ])
  })
})
