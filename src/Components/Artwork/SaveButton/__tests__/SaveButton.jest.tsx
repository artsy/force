import { ContextModule } from "@artsy/cohesion"
import { SaveButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveButton"
import { useAuthDialog } from "Components/AuthDialog/useAuthDialog"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { SaveButtonQuery } from "__generated__/SaveButtonQuery.graphql"
import { graphql } from "react-relay"
import { screen, fireEvent } from "@testing-library/react"

jest.unmock("react-relay")

jest.mock("Components/AuthDialog/useAuthDialog")

describe("SaveButton", () => {
  const mockUseAuthDialog = useAuthDialog as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL<SaveButtonQuery>({
    Component: props => (
      <SaveButtonFragmentContainer
        artwork={props.artwork as any}
        contextModule={ContextModule.artworkGrid}
      />
    ),
    query: graphql`
      query SaveButtonJestQuery {
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

    renderWithRelay({
      Artwork: () => ({
        internalID: "opaque-internal-id",
      }),
    })

    fireEvent.click(screen.getByRole("button"))

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
          imageUrl: '<mock-value-for-field-"url">',
        },
      },
    ])
  })
})
