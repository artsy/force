import React from "react"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import {
  Container,
  SaveButtonFragmentContainer,
  SaveButtonProps,
} from "../index"
import { graphql } from "react-relay"
import { mediator } from "lib/mediator"
import { mockLocation } from "v2/DevTools/mockLocation"
import { ContextModule } from "@artsy/cohesion"
import { useSystemContext } from "v2/Artsy/useSystemContext"

jest.unmock("react-relay")
jest.mock("v2/Artsy/useSystemContext")

class SaveButtonTestPage extends RootTestPage {
  async clickSaveButton() {
    this.find(Container).first().simulate("click")
    await this.update()
  }
}

describe("Save artwork", () => {
  let defaultData
  let defaultMutationResults
  let passedProps
  let trackEvent
  let Component

  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  beforeEach(() => {
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
    trackEvent = jest.fn()
    passedProps = {
      contextModule: ContextModule.worksForSaleRail,
      tracking: {
        trackEvent,
      },
    }
    Component = (props: SaveButtonProps) => (
      <SaveButtonFragmentContainer {...props} {...passedProps} />
    )
    jest.spyOn(mediator, "trigger")
    mockLocation()
  })

  const setupTestEnv = () => {
    return createTestEnv({
      Component,
      TestPage: SaveButtonTestPage,
      defaultData,
      defaultMutationResults,
      query: graphql`
        query SaveButtonTestQuery {
          artwork(id: "example-artwork-id") {
            ...SaveButton_artwork
          }
        }
      `,
    })
  }

  it("can save an artwork", async () => {
    const trigger = jest.fn()
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        user: { id: "blah" },
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
          trigger,
        },
      }
    })

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
    const trigger = jest.fn()
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        user: { id: "blah" },
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
          trigger,
        },
      }
    })

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
