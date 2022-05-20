import { RootTestPage } from "v2/DevTools/RootTestPage"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { SaveButtonFragmentContainer } from "../index"
import { graphql } from "react-relay"
import { mediator } from "lib/mediator"
import { mockLocation } from "v2/DevTools/mockLocation"
import { ContextModule } from "@artsy/cohesion"
import { useSystemContext } from "v2/System/useSystemContext"
import { useTracking } from "react-tracking"
import { SaveArtwork } from "../SaveArtworkMutation"

jest.unmock("react-relay")
jest.mock("v2/System/useSystemContext")
jest.mock("react-tracking")
jest.mock("../SaveArtworkMutation")

class SaveButtonTestPage extends RootTestPage {
  async clickSaveButton() {
    this.find("button").first().simulate("click")
    await this.update()
  }
}

describe("Save artwork", () => {
  let defaultData
  let defaultMutationResults
  let trackEvent
  let Component
  let trigger

  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  beforeAll(() => {
    const artwork = {
      id: "foo",
      internalID: "abcd1234",
      slug: "andy-warhol-skull",
      is_saved: false,
      title: "Skull",
      " $fragmentRefs": null,
      " $refType": null,
    }
    defaultData = { artwork }
    defaultMutationResults = {
      saveArtwork: {
        artwork: {
          ...artwork,
          is_saved: true,
        },
      },
    }
    ;(SaveArtwork as jest.Mock).mockImplementation(() =>
      Promise.resolve(defaultMutationResults)
    )

    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))

    Component = props => (
      <SaveButtonFragmentContainer
        contextModule={ContextModule.worksForSaleRail}
        {...props}
      />
    )

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

  const setupTestEnv = () => {
    return createTestEnv({
      Component,
      TestPage: SaveButtonTestPage,
      defaultData,
      defaultMutationResults,
      query: graphql`
        query SaveButtonTestQuery @relay_test_operation {
          artwork(id: "example-artwork-id") {
            ...SaveButton_artwork
          }
        }
      `,
    })
  }

  it("can save an artwork", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    await page.clickSaveButton()

    expect(trigger).not.toBeCalled()

    expect(trackEvent).toBeCalledWith({
      action: "Saved Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
    })
  })

  it("can remove a saved artwork", async () => {
    defaultData.artwork.is_saved = true
    defaultMutationResults.saveArtwork.artwork.is_saved = false
    const env = setupTestEnv()
    const page = await env.buildPage()

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

    const env = setupTestEnv()
    const page = await env.buildPage()

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
