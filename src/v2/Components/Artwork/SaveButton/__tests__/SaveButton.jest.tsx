import React from "react"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import {
  ClickContainer,
  SaveButtonFragmentContainer,
  SaveButtonProps,
} from "../index"
import { graphql } from "react-relay"
import { mediator } from "lib/mediator"
import { mockLocation } from "v2/DevTools/mockLocation"
import { ContextModule } from "@artsy/cohesion"

jest.unmock("react-relay")

class SaveButtonTestPage extends RootTestPage {
  async clickSaveButton() {
    this.find(ClickContainer).first().simulate("click")
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
    passedProps.user = { id: "blah" }
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSaveButton()
    expect(mediator.trigger).not.toBeCalled()
    expect(trackEvent).toBeCalledWith({
      action: "Saved Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
    })
  })

  it("can remove a saved artwork", async () => {
    passedProps.user = { id: "blah" }
    defaultData.artwork.is_saved = true
    defaultMutationResults.saveArtwork.artwork.is_saved = false
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSaveButton()
    expect(mediator.trigger).not.toBeCalled()
    expect(trackEvent).toBeCalledWith({
      action: "Removed Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
    })
  })

  it("opens auth modal with expected args when saving an artwork", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSaveButton()
    expect(mediator.trigger).toBeCalledWith("open:auth", {
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
