import { RootTestPage } from "DevTools/RootTestPage"
import { SaveButtonFragmentContainer } from "../index"
import { graphql } from "react-relay"
import { mediator } from "Server/mediator"
import { mockLocation } from "DevTools/mockLocation"
import { ContextModule } from "@artsy/cohesion"
import { useSystemContext } from "System/useSystemContext"
import { useTracking } from "react-tracking"
import { SaveArtwork } from "../SaveArtworkMutation"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools"

jest.unmock("react-relay")
jest.mock("System/useSystemContext")
jest.mock("react-tracking")
jest.mock("../SaveArtworkMutation")

class SaveButtonTestPage extends RootTestPage {
  async clickSaveButton() {
    this.find("button").first().simulate("click")
    await this.update()
  }
}

describe("Save artwork", () => {
  let defaultMutationResults
  let trackEvent
  let trigger

  const artwork = {
    id: "foo",
    internalID: "abcd1234",
    slug: "andy-warhol-skull",
    is_saved: false,
    title: "Skull",
  }

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <SaveButtonFragmentContainer
          contextModule={ContextModule.worksForSaleRail}
          {...props}
        />
      </MockBoot>
    ),
    query: graphql`
      query SaveButtonTestQuery @relay_test_operation {
        artwork(id: "example-artwork-id") {
          ...SaveButton_artwork
        }
      }
    `,
  })

  beforeAll(() => {
    defaultMutationResults = {
      saveArtwork: {
        artwork: {
          ...artwork,
          is_saved: true,
        },
      },
    }

    mediator.on("open:auth", () => {})
    ;(SaveArtwork as jest.Mock).mockImplementation(() =>
      Promise.resolve(defaultMutationResults)
    )

    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))

    jest.spyOn(mediator, "trigger")
    mockLocation()

    trigger = jest.fn()
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        isLoggedIn: true,
        relayEnvironment: {},
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
          ready: jest.fn(),
          trigger,
        },
      }
    })
  })

  it("can save an artwork", async () => {
    const wrapper = getWrapper({
      Artwork: () => artwork,
    })
    const page = new SaveButtonTestPage(wrapper)

    await page.clickSaveButton()

    expect(trigger).not.toBeCalled()

    expect(trackEvent).toBeCalledWith({
      action: "Saved Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
    })
  })

  it("can remove a saved artwork", async () => {
    defaultMutationResults.saveArtwork.artwork.is_saved = false
    const wrapper = getWrapper({
      Artwork: () => ({ ...artwork, is_saved: true }),
    })
    const page = new SaveButtonTestPage(wrapper)

    await page.clickSaveButton()

    expect(trigger).not.toBeCalled()

    expect(trackEvent).toBeCalledWith({
      action: "Removed Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
    })
  })

  it("opens auth modal with expected args when saving an artwork", async () => {
    const trigger = jest.fn()
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        user: null,
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
          ready: jest.fn().mockReturnValue(true),
          trigger,
        },
      }
    })

    const wrapper = getWrapper({
      Artwork: () => artwork,
    })
    const page = new SaveButtonTestPage(wrapper)

    await page.clickSaveButton()

    expect(trigger).toBeCalledWith("open:auth", {
      mode: "signup",
      contextModule: "worksForSaleRail",
      copy: "Sign up to save artworks",
      intent: "saveArtwork",
      afterSignUpAction: {
        action: "save",
        kind: "artworks",
        objectId: "andy-warhol-skull",
      },
    })
  })
})
