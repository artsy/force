import { ContextModule } from "@artsy/cohesion"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { DeprecatedSaveButtonFragmentContainer } from "Components/Artwork/SaveButton/index"
import { useAuthDialog } from "Components/AuthDialog"
import { MockBoot } from "DevTools/MockBoot"
import { RootTestPage } from "DevTools/RootTestPage"
import { mockLocation } from "DevTools/mockLocation"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-tracking")
jest.mock("../SaveArtworkMutation")
jest.mock("Components/AuthDialog/useAuthDialog")

class DeprecatedSaveButtonTestPage extends RootTestPage {
  async clickSaveButton() {
    this.find("button").first().simulate("click")
    await this.update()
  }
}

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

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <DeprecatedSaveButtonFragmentContainer
          contextModule={ContextModule.worksForSaleRail}
          {...props}
        />
      </MockBoot>
    ),
    query: graphql`
      query DeprecatedSaveButtonTestQuery @relay_test_operation {
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
      Promise.resolve(defaultMutationResults)
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
    const { wrapper } = getWrapper({
      Artwork: () => artwork,
    })
    const page = new DeprecatedSaveButtonTestPage(wrapper)

    await page.clickSaveButton()

    expect(trackEvent).toBeCalledWith({
      action: "Saved Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
    })
  })

  it("can remove a saved artwork", async () => {
    defaultMutationResults.saveArtwork.artwork.isSavedToAnyList = false
    const { wrapper } = getWrapper({
      Artwork: () => ({ ...artwork, isSavedToAnyList: true }),
    })
    const page = new DeprecatedSaveButtonTestPage(wrapper)

    await page.clickSaveButton()

    expect(trackEvent).toBeCalledWith({
      action: "Removed Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
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

    const { wrapper } = getWrapper({
      Artwork: () => artwork,
    })
    const page = new DeprecatedSaveButtonTestPage(wrapper)

    await page.clickSaveButton()

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
