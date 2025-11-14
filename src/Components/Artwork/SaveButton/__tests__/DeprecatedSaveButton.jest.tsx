import { DeprecatedSaveButtonFragmentContainer } from "Components/Artwork/SaveButton/index"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { useAuthDialog } from "Components/AuthDialog"
import { MockBoot } from "DevTools/MockBoot"
import { mockLocation } from "DevTools/mockLocation"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ContextModule } from "@artsy/cohesion"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-tracking")
jest.mock("../SaveArtworkMutation")
jest.mock("Components/AuthDialog/useAuthDialog")

describe("Deprecated Save artwork", () => {
  let defaultMutationResults
  let trackEvent

  const artwork = {
    id: "foo",
    internalID: "abcd1234",
    slug: "andy-warhol-skull",
    isSavedToAnyList: false,
    title: "Skull",
  }

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot>
        <DeprecatedSaveButtonFragmentContainer
          contextModule={ContextModule.worksForSaleRail}
          {...props}
        />
      </MockBoot>
    ),
    query: graphql`
      query DeprecatedSaveButtonJestQuery @relay_test_operation {
        artwork(id: "example-artwork-id") {
          ...DeprecatedSaveButton_artwork
        }
      }
    `,
  })

  beforeAll(() => {
    defaultMutationResults = {
      saveArtwork: {
        artwork: {
          ...artwork,
          isSavedToAnyList: true,
        },
      },
    }
    ;(SaveArtwork as jest.Mock).mockImplementation(() =>
      Promise.resolve(defaultMutationResults),
    )

    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))

    mockLocation()
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        isLoggedIn: true,
        relayEnvironment: {},
      }
    })
    ;(useAuthDialog as jest.Mock).mockImplementation(() => {
      return { showAuthDialog: jest.fn() }
    })
  })

  it("can save an artwork", async () => {
    renderWithRelay({
      Artwork: () => artwork,
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    await waitFor(() => {
      expect(trackEvent).toBeCalledWith({
        action: "Saved Artwork",
        entity_id: "abcd1234",
        entity_slug: "andy-warhol-skull",
      })
    })
  })

  it("can remove a saved artwork", async () => {
    defaultMutationResults.saveArtwork.artwork.isSavedToAnyList = false
    renderWithRelay({
      Artwork: () => ({ ...artwork, isSavedToAnyList: true }),
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    await waitFor(() => {
      expect(trackEvent).toBeCalledWith({
        action: "Removed Artwork",
        entity_id: "abcd1234",
        entity_slug: "andy-warhol-skull",
      })
    })
  })

  it("opens auth modal with expected args when saving an artwork", async () => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return { user: null }
    })

    const showAuthDialog = jest.fn()
    ;(useAuthDialog as jest.Mock).mockImplementation(() => {
      return { showAuthDialog }
    })

    renderWithRelay({
      Artwork: () => artwork,
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    await waitFor(() => {
      expect(showAuthDialog).toBeCalledWith({
        analytics: { contextModule: "worksForSaleRail", intent: "saveArtwork" },
        options: {
          afterAuthAction: {
            action: "save",
            kind: "artworks",
            objectId: "abcd1234",
          },
          title: expect.any(String),
        },
      })
    })
  })
})
